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
  { kode: "14823323", nama: "Dasar Pemrograman", semester: 1, sks: 3, grade: "AB", nilaiAngka: 3.5 },
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
// 2. FUNGSI RENDER KE HTML (DOM Manipulation)
// ===================================================
function renderTable() {
  tbody.innerHTML = ""; // Kosongkan tabel dulu agar tidak duplikat

  dataMatakuliah.forEach((mk, index) => {
    // Hitung Nilai Konversi (N.K.)
    const nk = mk.sks * mk.nilaiAngka;
    
    // Menentukan class warna badge sesuai grade
    let badgeClass = "grade-a";
    if (mk.grade === "AB") badgeClass = "grade-ab";
    else if (mk.grade === "B") badgeClass = "grade-b";

    // Membuat elemen tr secara dinamis
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${mk.kode}</td>
      <td class="kolom-nama">${mk.nama}</td>
      <td>${mk.semester}</td>
      <td>${mk.sks}</td>
      <td><span class="grade-badge ${badgeClass}">${mk.grade}</span></td>
      <td>${nk.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="hapusData(${index})">
          <i class="bi bi-trash"></i> Hapus
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Panggil fungsi render pertama kali saat web dimuat
renderTable();

// ===================================================
// 3. EVENT 1: FORM TAMBAH DATA (Submit)
// ===================================================
formTambah.addEventListener("submit", function(event) {
  event.preventDefault(); // Mencegah halaman me-refresh

  const kodeVal = document.getElementById("inputKode").value.trim();
  const namaVal = document.getElementById("inputNamaMK").value.trim();
  const sksVal = parseInt(document.getElementById("inputSks").value);
  const gradeVal = document.getElementById("inputGrade").value;

  // Validasi sederhana (jangan sampai ada input yang kosong)
  if (!kodeVal || !namaVal || isNaN(sksVal) || !gradeVal) {
    alert("Harap isi semua form dengan benar!");
    return;
  }

  // Tentukan nilai angka untuk perhitungan N.K
  let angka = 0;
  if (gradeVal === "A") angka = 4.0;
  else if (gradeVal === "AB") angka = 3.5;
  else if (gradeVal === "B") angka = 3.0;

  // Buat object data baru untuk dimasukkan ke tabel
  const matkulBaru = {
    kode: kodeVal,
    nama: namaVal,
    semester: 3,
    sks: sksVal,
    grade: gradeVal,
    nilaiAngka: angka
  };

  // Masukkan data baru ke akhir array lalu render ulang tabelnya
  dataMatakuliah.push(matkulBaru);
  renderTable();

  // Bersihkan kolom isian form
  formTambah.reset();
});

// ===================================================
// 4. EVENT 2: PENCARIAN / FILTER DATA (Input)
// ===================================================
inputCari.addEventListener("input", function(event) {
  const keyword = event.target.value.toLowerCase();
  const semuaBaris = tbody.querySelectorAll("tr");

  semuaBaris.forEach((baris) => {
    // Ambil isi teks dari kolom nama
    const namaMatkul = baris.querySelector(".kolom-nama").textContent.toLowerCase();
    
    // Logika menyembunyikan tabel jika tidak cocok dengan kata kunci
    if (namaMatkul.includes(keyword)) {
      baris.classList.remove("sembunyi"); 
    } else {
      baris.classList.add("sembunyi"); 
    }
  });
});

// ===================================================
// 5. EVENT 3: HAPUS DATA (Click)
// ===================================================
function hapusData(index) {
  // Kotak dialog untuk konfirmasi
  const yakin = confirm("Apakah kamu yakin ingin menghapus mata kuliah ini?");
  if (yakin) {
    // Fungsi splice untuk membuang 1 data dari array berdasarkan index
    dataMatakuliah.splice(index, 1);
    
    // Perbarui tampilan tabel setelah data dihapus
    renderTable();
  }
}

// ===================================================
// 6. FITUR JQUERY: MANIPULASI DOM & ANIMASI
// ===================================================
$(document).ready(function() {
  
  // Ketika tombol "Sembunyikan / Tampilkan Ringkasan" di-klik
  $("#btnToggleSummary").click(function() {
    
    // Efek animasi slide ke atas/bawah pada elemen summary-wrap
    $(".summary-wrap").slideToggle('slow');
    
  });
  
});