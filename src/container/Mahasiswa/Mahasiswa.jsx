import React, {Component} from "react";
import './Mahasiswa.css';
import Post from "../../component/Mahasiswa/Siswa";

class Mahasiswa extends Component{
    state= { // komponen state dari React untuk statefull component
        listMahasiswa : [], // Variabel array yang digunakan untuk menyimpan data API
        insertMahasiswa: { // Variabel yang digunakan untuk menampung sementara data yang akan di insert
            NIM: 1, // kolom userId, id, title, dan boody sama, mengikuti kolom yang ada pada listMahasiswa.json
            nama: "",
            alamat: "",
            hp: "",
            angkatan: 1,
            status: ""
        }
    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3000/mahasiswa') // alamat URL API yang ingin kita ambil datanya
            .then(response => response.json()) // Ubah response data dari URL API menjadi sebuah data json
            .then(jsonHasilAmbilDariAPI => {
                this.setState({
                    listMahasiswa: jsonHasilAmbilDariAPI
            })
        })
    }

    componentDidMount(){ // Komponen untuk mengecek ketika component telah di-mount-ing, maka panggil API
        this.ambilDataDariServerAPI() // ambil data dari server api lokal
    }

    handleHapuMahasiswa = (data) => {
        fetch(`http://localhost:3000/mahasiswa/${data}`, {method: 'DELETE'}) // alamat URL API yang ingin kita ambil datanya
         .then(res => { // Ketika proses hapus berhasil, maka ambil data dari server API lokal
            this.ambilDataDariServerAPI()
         })
    }

    handleTambahMahasiswa = (event) => { // fungsi untuk meng-handle form tambah data Mahasiswa
        let formInsertMahasiswa = {...this.state.insertMahasiswa}; // clonning data state insertMahasiswa ke dalam variabel formInsertMahasiswa
        let timeStamp = new Date().getTime; // Digunakan untuk menyimpan waktu (sebagai ID Mahasiswa)
        formInsertMahasiswa['NIM'] = timeStamp;
        formInsertMahasiswa[event.target.name] = event.target.value; // Menyimpan data onchange ke formInsert sesuai dengan target yang diinginkan
        this.setState({
            insertMahasiswa: formInsertMahasiswa
        });
        // console.log(formInsertMahasiswa);
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3000/mahasiswa', {
            method: 'post',
            headers:{
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state.insertMahasiswa) // Kirimkan ke body request untuk data Mahasiswa yang akan ditambahkan
        })
            .then((Response) => {
                this.ambilDataDariServerAPI();
            })
    }

    render(){
        return(
            <div className="post-artikel">
                <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="NIM" className="col-sm-2 col-form-label">NIM</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="NIM" name="NIM" onChange={this.handleTambahMahasiswa} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="nama" className="col-sm-2 col-form-label">Nama</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="nama" name="nama" onChange={this.handleTambahMahasiswa} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="alamat" className="col-sm-2 col-form-label">Isi</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="alamat" name="alamat" rows="3" onChange={this.handleTambahMahasiswa}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="hp" className="col-sm-2 col-form-label">Nomor HP</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="hp" name="hp" onChange={this.handleTambahMahasiswa} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="angkatan" className="col-sm-2 col-form-label">Angkatan</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="angkatan" name="angkatan" onChange={this.handleTambahMahasiswa} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="status" name="status" onChange={this.handleTambahMahasiswa} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-priary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
                <h2>Daftar Mahasiswa</h2>
                {
                    this.state.listMahasiswa.map(Mahasiswa => { // Looping dan masukkan untuk setiap data yang ada di listMahasiswa ke variabel Mahasiswa
                        // return <Siswa key={Mahasiswa.NIM} nama={Mahasiswa.nama} alamat={Mahasiswa.alamat} NIMMahasiswa={Mahasiswa.NIM} hapusMahasiswa={this.handleHapuMahasiswa} /> // Mappingkan data json dari API sesuai dengan kategorinya
                    })
                }
            </div>
        )
    }
}

export default Mahasiswa;
