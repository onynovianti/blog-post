import React, {Component} from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post";

class BlogPost extends Component{
    state= { // komponen state dari React untuk statefull component
        listArtikel : [], // Variabel array yang digunakan untuk menyimpan data API
        insertArtikel: { // Variabel yang digunakan untuk menampung sementara data yang akan di insert
            userId: 1, // kolom userId, id, title, dan boody sama, mengikuti kolom yang ada pada listArtikel.json
            id: 1,
            title: "",
            body: ""
        }
    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3000/posts') // alamat URL API yang ingin kita ambil datanya
            .then(response => response.json()) // Ubah response data dari URL API menjadi sebuah data json
            .then(jsonHasilAmbilDariAPI => {
                this.setState({
                    listArtikel: jsonHasilAmbilDariAPI
            })
        })
    }

    componentDidMount(){ // Komponen untuk mengecek ketika component telah di-mount-ing, maka panggil API
        this.ambilDataDariServerAPI() // ambil data dari server api lokal
    }

    handleHapuArtikel = (data) => {
        fetch(`http://localhost:3000/posts/${data}`, {method: 'DELETE'}) // alamat URL API yang ingin kita ambil datanya
         .then(res => { // Ketika proses hapus berhasil, maka ambil data dari server API lokal
            this.ambilDataDariServerAPI()
         })
    }

    handleTambahArtikel = (event) => { // fungsi untuk meng-handle form tambah data artikel
        let formInsertArtikel = {...this.state.insertArtikel}; // clonning data state insertArtikel ke dalam variabel formInsertArtikel
        let timeStamp = new Date().getTime; // Digunakan untuk menyimpan waktu (sebagai ID Artikel)
        formInsertArtikel['id'] = timeStamp;
        formInsertArtikel[event.target.name] = event.target.value; // Menyimpan data onchange ke formInsert sesuai dengan target yang diinginkan
        this.setState({
            insertArtikel: formInsertArtikel
        });
        // console.log(formInsertArtikel);
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3000/posts', {
            method: 'post',
            headers:{
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state.insertArtikel) // Kirimkan ke body request untuk data artikel yang akan ditambahkan
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
                        <label htmlFor="title" className="col-sm-2 col-form-label">Judul</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name="title" onChange={this.handleTambahArtikel} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="body" className="col-sm-2 col-form-label">Isi</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="body" name="body" rows="3" onChange={this.handleTambahArtikel}></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-priary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
                <h2>Daftar Artikel</h2>
                {
                    this.state.listArtikel.map(artikel => { // Looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
                        return <Post key={artikel.id} judul={artikel.title} isi={artikel.body} idArtikel={artikel.id} hapusArtikel={this.handleHapuArtikel} /> // Mappingkan data json dari API sesuai dengan kategorinya
                    })
                }
            </div>
        )
    }
}

export default BlogPost;
