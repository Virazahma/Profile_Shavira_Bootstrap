// ===================================================
// 1. Array of Object (5 Data Matakuliah)
// ===================================================
const dataMatakuliah = [
  { nama: "Pemrograman Web", sks: 3, nilaiAngka: 3.75, grade: "A-" },
  { nama: "Struktur Data", sks: 3, nilaiAngka: 4.00, grade: "A" },
  { nama: "Basis Data", sks: 4, nilaiAngka: 3.50, grade: "B+" },
  { nama: "Sistem Operasi", sks: 3, nilaiAngka: 3.00, grade: "B" },
  { nama: "Matematika Diskrit", sks: 2, nilaiAngka: 4.00, grade: "A" }
];

// ===================================================
// 2. Function 1: Menghitung IPK berdasarkan total SKS & Nilai
// ===================================================
function hitungIPK(daftarMatkul) {
  let totalBobot = 0;
  let totalSks = 0;

  // 3. Pengulangan (for...of) & Logika Operator
  for (const matkul of daftarMatkul) {
    totalBobot += matkul.nilaiAngka * matkul.sks;
    totalSks += matkul.sks;
  }

  if (totalSks === 0) return 0; // Mencegah pembagian 0

  const ipk = totalBobot / totalSks;
  return ipk.toFixed(2); // Mengambil 2 angka desimal
}

// ===================================================
// 2. Function 2: Filter Matakuliah dengan Nilai Bagus
// ===================================================
function cariMatakuliahBagus(daftarMatkul, batasNilai) {
  const hasilCari = [];

  // Pengulangan (forEach) & Operator Perbandingan (>=)
  daftarMatkul.forEach(function (matkul) {
    if (matkul.nilaiAngka >= batasNilai) {
      hasilCari.push(matkul.nama);
    }
  });

  return hasilCari;
}

// ===================================================
// 4. Menampilkan Hasil Pengolahan Data di Console
// ===================================================
console.log("=== DATA PROFIL DAN NILAI MATAKULIAH ===");

// Panggil Function 1
const nilaiIPK = hitungIPK(dataMatakuliah);
console.log("Hasil Perhitungan IPK:", nilaiIPK);

// Panggil Function 2
const matkulUnggulan = cariMatakuliahBagus(dataMatakuliah, 3.50);
console.log("Daftar Matakuliah dengan Nilai >= 3.50:", matkulUnggulan);