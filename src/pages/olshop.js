import React from 'react'
import Card from "../components/Cardolshop"
import $ from "jquery"
import "bootstrap/dist/js/bootstrap.bundle"

//menyambungkan
class olshop extends React.Component {
    constructor(){
        super()
        this.state = {
            buku: [
                {
                    isbn: "12345", judul:"bulan", penulis:"tere liye",penerbit:"CV Harapan Kita", harga: 90000, cover:"https://drive.google.com/uc?id=1ui-jyKgu3DqFyo7VKJu-FFXkaNQN3aSg"
                },
                {
                    isbn: "12346", judul:"anak badai", penulis:"tere liye",penerbit:"CV Nusa", harga: 85000, cover:"https://drive.google.com/uc?id=1rJDcCOmsd14NL6DG3Wps_kewZomGcLU-"
                },
            ],

            action: " ",
            isbn: " ",
            judul: " ",
            penulis: " ",
            penerbit: " ",
            harga: 0,
            cover: "",
            selectedItem: null,
            keyword: "",
            filterBuku: []
        }

        this.state.filterBuku = this.state.buku
    }

    // fungsi menabah data
    Add = () => {
        //menampilkan komponen modal nya
        $("#modal_buku").modal("show")

        //mengosong data setelah ditambahkan
        this.setState({
            isbn: Math.random(1, 10000),
            judul: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }

    //fungsi edit
    Edit = (item) => {
        //menampilkan komponen modal nya
        $("#modal_buku").modal("show")

        //form control
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item,   
        })
    }

    //fungsi save
    Save = (event) => {
        event.preventDefault();
        //perintah menampung data state buku
        let tempBuku = this.state.buku

        //membagi kondisi 
        if (this.state.action === "insert") {
            //menambah data baru
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            })
        } else if(this.state.action === "update"){
            //menyimpan perubahan baru
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn = this.state.isbn
            tempBuku[index].judul = this.state.judul
            tempBuku[index].penulis = this.state.penulis
            tempBuku[index].penerbit = this.state.penerbit
            tempBuku[index].cover = this.state.cover
            tempBuku[index].harga = this.state.harga
        }
        //mengembalikan variabel buku
        this.setState({buku: tempBuku})

        //menutup komponen modal_buku
        $("#modal_buku").modal("hide")
    }

    //fungsi untuk menhapus
    Drop = (item) => {
        //beri konfirmasi untuk menghapus data
        if(window.confirm("apakah anda yakin ingin menghapus data ini?")){
            //menghapus data
            let tempBuku = this.state.buku

            //posisi index data yang akan dihapus
            let index = tempBuku.indexOf(item)

            //settelah menemukan hapus data
            tempBuku.splice(index, 1)

            //kembalikan data ke state buku
            this.setState({buku: tempBuku})
        }
    }

    //fungsi utnuk pencarian
    searching = event => {
        if(event.keyCode === 13){
            //13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLocaleLowerCase()
            let tempBuku = this.state.buku
            //menampung filter
            let result = tempBuku.filter(item => {
                return item.judul.toLocaleLowerCase().includes(keyword) || item.penulis.toLocaleLowerCase().includes(keyword) || item.penerbit.toLocaleLowerCase().includes(keyword)
            })
            // menampilkan data dari variabel result
            this.setState({filterBuku: result})
        }
    }


    render(){
        return(
            <div className="container">
            <input type="text" className="form-control my-2" placeholder="pencarian" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
               <div className="row">
                    {this.state.filterBuku.map( (item, index) => (
                        <Card 
                            judul={ item.judul}
                            penulis={ item.penulis}
                            penerbit={ item.penerbit}
                            harga= { item.harga}
                            cover= {item.cover}
                            onEdit={ () => this.Edit(item)}
                            onDrop={ () => this.Drop(item)}
                        />
                    ))}
               </div>
               <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
               </button>

               {/** component model sbg control manipulasi data */}
                <div className="modal" id="modal_buku">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/** modal header */}
                            <div className="modal-header">
                                Form Buku
                            </div>

                            {/** modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Judul Buku
                                    <input type="text" className="form-control mb-2" value={this.state.judul} onChange={ev => this.setState({judul: ev.target.value})} required/>

                                    Penulis Buku
                                    <input type="text" className="form-control mb-2" value={this.state.penulis} onChange={ev => this.setState({penulis: ev.target.value})} required/>

                                    Penerbit
                                    <input type="text" className="form-control mb-2" value={this.state.penerbit} onChange={ev => this.setState({penerbit: ev.target.value})} required/>

                                    Harga Buku
                                    <input type="number" className="form-control mb-2" value={this.state.harga} onChange={ev => this.setState({harga: ev.target.value})} required/>

                                    Cover Buku
                                    <input type="url" className="form-control mb-2" value={this.state.cover} onChange={ev => this.setState({cover: ev.target.value})} required/>

                                    <button className="btn btn-info btn-block" type="submit">Simpan</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

//export
export default olshop;