export interface RegistrationData {
  id: string;
  role: 'petani' | 'hub_sentra' | 'ekspedisi' | 'pabrik';
  fullName: string;
  phone: string;
  location: string;
  capacity: string;
  notes: string;
  createdAt: string;
}

export const ROLE_SHEET_NAMES: Record<string, string> = {
  petani: '1. Petani Pesisir',
  hub_sentra: '2. Hub Agregasi & QC',
  ekspedisi: '3. Ekspedisi Kargo Laut',
  pabrik: '4. Pabrik Pengolahan Hilir'
};

const SHEET_HEADERS = [
  'ID Registrasi',
  'Waktu Pendaftaran (WITA/WIB)',
  'Nama Lengkap / PIC',
  'Nomor WhatsApp',
  'Domisili / Lokasi Sentra',
  'Estimasi Kapasitas / Bentangan Tali',
  'Catatan / Keterangan',
  'Status Kemitraan'
];

/**
 * Searches for an existing Talisea registrations spreadsheet or creates a new one
 * with separated sheets for Petani, Hub, Ekspedisi, and Pabrik.
 */
export async function getOrCreateSpreadsheet(accessToken: string): Promise<string> {
  const SPREADSHEET_KEY = 'talisea_google_sheet_id';
  const existingId = localStorage.getItem(SPREADSHEET_KEY);

  if (existingId) {
    // Verify it still exists and is accessible
    try {
      const checkRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${existingId}?fields=spreadsheetId,properties.title`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (checkRes.ok) {
        return existingId;
      }
    } catch {
      // invalid or deleted, create fresh
    }
  }

  // Create new Spreadsheet with dedicated sheets
  const newSpreadsheet = {
    properties: {
      title: 'Talisea.id - Database Registrasi Kemitraan Ekosistem'
    },
    sheets: [
      {
        properties: {
          title: ROLE_SHEET_NAMES.petani,
          gridProperties: { rowCount: 100, columnCount: 10, frozenRowCount: 1 }
        }
      },
      {
        properties: {
          title: ROLE_SHEET_NAMES.hub_sentra,
          gridProperties: { rowCount: 100, columnCount: 10, frozenRowCount: 1 }
        }
      },
      {
        properties: {
          title: ROLE_SHEET_NAMES.ekspedisi,
          gridProperties: { rowCount: 100, columnCount: 10, frozenRowCount: 1 }
        }
      },
      {
        properties: {
          title: ROLE_SHEET_NAMES.pabrik,
          gridProperties: { rowCount: 100, columnCount: 10, frozenRowCount: 1 }
        }
      }
    ]
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newSpreadsheet)
  });

  if (!createRes.ok) {
    const errorBody = await createRes.text();
    throw new Error(`Gagal membuat Google Sheets baru: ${errorBody}`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  localStorage.setItem(SPREADSHEET_KEY, spreadsheetId);

  // Add Headers to all 4 sheets
  for (const sheetName of Object.values(ROLE_SHEET_NAMES)) {
    try {
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A1:H1?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            range: `${sheetName}!A1:H1`,
            majorDimension: 'ROWS',
            values: [SHEET_HEADERS]
          })
        }
      );
    } catch (e) {
      console.warn(`Failed writing headers to ${sheetName}`, e);
    }
  }

  return spreadsheetId;
}

/**
 * Appends a registration row directly to the corresponding role's sheet tab
 */
export async function appendRegistrationToSheet(
  accessToken: string,
  data: RegistrationData
): Promise<{ spreadsheetId: string; sheetUrl: string; sheetName: string }> {
  const spreadsheetId = await getOrCreateSpreadsheet(accessToken);
  const sheetName = ROLE_SHEET_NAMES[data.role] || '1. Petani Pesisir';

  const dateFormatted = new Date(data.createdAt).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const rowValues = [
    data.id,
    dateFormatted,
    data.fullName,
    data.phone,
    data.location,
    data.capacity,
    data.notes || '-',
    'Terverifikasi (Baru)'
  ];

  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A1:H1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `${sheetName}!A1:H1`,
        majorDimension: 'ROWS',
        values: [rowValues]
      })
    }
  );

  if (!appendRes.ok) {
    const errorText = await appendRes.text();
    throw new Error(`Gagal menyimpan data ke Google Sheets tab ${sheetName}: ${errorText}`);
  }

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  return { spreadsheetId, sheetUrl, sheetName };
}
