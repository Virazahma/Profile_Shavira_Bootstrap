// ===================================================
// 1. DATA AWAL (Array of Objects Lengkap Semester 1 & 2)
// ===================================================
let dataMatakuliah = [
  // --- Semester 2 ---
  { kode: "14823393", nama: "Interaksi Manusia Komputer", semester: 2, sks: 3, grade: "A", nilaiAngka: 4.0 },
  { kode: "14823372", nama: "Statistika dan Probabilitas", semester: 2, sks: 2, grade: "A", nilaiAngka: 4.0 },
  { kode: "14823333", nama: "Algoritma dan Struktur Data", semester: 2, sks: 3, grade: "A", nilaiAngka: 4.0 },
  { kode: "14823313", nama: "Sistem Basis Data", semester: 2, sks: 3, grade: "A", nilaiAngka: 4.0 },
  { kode: "14823274", nama: "Pemrograman Berorientasi Objek", semester: 2, sks: 4, grade: "A", nilaiAngka: 4.0 },
  { kode: "14823192", nama: "Arsitektur dan Organisasi Komputer", semester: 2, sks: 2, grade: "AB", nilaiAngka: 3.5 },
  { kode: "14823153", nama: "Teknologi Informasi dan Aplikasi Bisnis Berkembang", semester: 2, sks: 3, grade: "AB", nilaiAngka: 3.5 },
  
  // --- Semester 1 ---
  { kode: "14823532", nama: "Bahasa Inggris", semester: 1, sks: 2, grade: "A", nilaiAngka: 4.0 },
  { kode: "14823352", nama: "Matematika Diskrit", semester: 1, sks: 2, grade: "AB", nilaiAngka: 3.5 },
  { kode: "14823012", nama: "Etika Pengembangan Teknologi Siber", semester: 1, sks: 2, grade: "A", nilaiAngka: 4.0 },
  { kode: "14823323", nama: "Dasar Pemrograman**", semester: 1, sks: 3, grade: "AB", nilaiAngka: 3.5 },
  { kode: "14823342", nama: "Aljabar Linier", semester: 1, sks: 2, grade: "A", nilaiAngka: 4.0 },
  { kode: "14823362", nama: "Kalkulus", semester: 1, sks: 2, grade: "B", nilaiAngka: 3.0 },
  { kode: "14823202", nama: "Sistem Operasi", semester: 1, sks: 2, grade: "AB", nilaiAngka: 3.5 },
  { kode: "14823103", nama: "Konsep dan Fondasi Sistem Informasi", semester: 1, sks: 3, grade: "AB", nilaiAngka: 3.5 }
];

// Ambil elemen dari HTML
const tbody = document.getElementById("tabelNilaiBody");
const formTambah = document.getElementById("formTambah");
const inputCari = document.getElementById("inputCari");

// ===================================================
// 2. FUNGSI RENDER KE HTML (Menjawab Poin 1)
// ===================================================
function renderTable() {
  tbody.innerHTML = ""; // Kosongkan tabel dulu

  dataMatakuliah.forEach((mk, index) => {
    // Hitung Nilai Konversi (N.K.)
    const nk = mk.sks * mk.nilaiAngka;
    
    // Menentukan class warna badge sesuai grade
    let badgeClass = "grade-a";
    if (mk.grade === "AB") badgeClass = "grade-ab";
    else if (mk.grade === "B") badgeClass = "grade-b";

    // Membuat elemen <tr> menggunakan createElement
    const tr = document.createElement("tr");
    
    // Menggunakan template literal untuk isi baris
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${mk.kode}</td>
      <td class="kolom-nama">${mk.nama}</td>
      <td>${mk.semester}</td>
      <td>${mk.sks}</td>
      <td><span class="grade-badge ${badgeClass}">${mk.grade}</span></td>
      <td>${nk.toFixed(2)}</td>
    `;

    // Masukkan ke dalam tbody
    tbody.appendChild(tr);
  });
}

// Panggil fungsi render pertama kali saat web dimuat
renderTable();

// ===================================================
// 3. EVENT LISTENER 1: FORM TAMBAH DATA (Menjawab Poin 2 & 3)
// ===================================================
formTambah.addEventListener("submit", function(event) {
  event.preventDefault(); // Mencegah halaman me-refresh

  // Ambil nilai dari inputan
  const kodeVal = document.getElementById("inputKode").value.trim();
  const namaVal = document.getElementById("inputNamaMK").value.trim();
  const sksVal = parseInt(document.getElementById("inputSks").value);
  const gradeVal = document.getElementById("inputGrade").value;

  // Validasi (Pastikan semua terisi)
  if (!kodeVal || !namaVal || isNaN(sksVal) || !gradeVal) {
    alert("Harap isi semua form dengan benar!");
    return;
  }

  // Tentukan nilai angka berdasarkan grade
  let angka = 0;
  if (gradeVal === "A") angka = 4.0;
  else if (gradeVal === "AB") angka = 3.5;
  else if (gradeVal === "B") angka = 3.0;

  // Buat object baru
  const matkulBaru = {
    kode: kodeVal,
    nama: namaVal,
    semester: 3, // Default semester 3 untuk mata kuliah yang baru ditambahkan
    sks: sksVal,
    grade: gradeVal,
    nilaiAngka: angka
  };

  // Masukkan ke array dan render ulang
  dataMatakuliah.push(matkulBaru);
  renderTable();

  // Reset form kembali kosong
  formTambah.reset();

  // Highlight baris terakhir menggunakan classList (Menjawab poin 4)
  const barisTerakhir = tbody.lastElementChild;
  barisTerakhir.classList.add("baris-baru");
  setTimeout(() => {
    barisTerakhir.classList.remove("baris-baru");
  }, 2000);
});

// ===================================================
// 4. EVENT LISTENER 2: FITUR PENCARIAN (Menjawab Poin 2 & 4)
// ===================================================
inputCari.addEventListener("input", function(event) {
  const keyword = event.target.value.toLowerCase();
  const semuaBaris = tbody.querySelectorAll("tr");

  semuaBaris.forEach((baris) => {
    const namaMatkul = baris.querySelector(".kolom-nama").textContent.toLowerCase();
    
    // Logika classList: jika teks tidak cocok, tambahkan class "sembunyi"
    if (namaMatkul.includes(keyword)) {
      baris.classList.remove("sembunyi"); // Munculkan
    } else {
      baris.classList.add("sembunyi"); // Sembunyikan dengan classList
    }
  });
});