import React from "react"

class Cart extends React.Component{
    constructor(){
        super()
        this.state = {
            cart: [], //unruk menyimpan list cart
            user: "", //untuk menyimpan data namauser
            total: 0, //untuk menyimpan data total belanja
        }
    }

    //memanggil data dengan fungsi baru
    initCart = () => {
        //memanggil data cart pada localstorage
        let tempCart = JSON.parse(localStorage.getItem("cart"))

        //memanggil data user
        let userName = localStorage.getItem("user")

        //kalkulasi total belanja
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga * item.jumlahBeli)
        })

        //memasukan data cart, total harga dan user pada state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }

    //fungsi memanggil init cart setelah di render
    componentDidMount(){
        this.initCart()
    }

    render(){
        return(
            <div className="container">
                <div className="card col-12 mt-2">
                    <div className="card-header bg-primary text-white">
                        <h4>Data Keranjang Belanja</h4>
                    </div>

                    <div className="card-body">
                        <h5 className="text-primary">
                            Naama User : {this.state.user}
                        </h5>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nama Item</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{ item.judul}</td>
                                        <td>{ item.harga}</td>
                                        <td>{ item.jumlahBeli}</td>
                                        <td>
                                            Rp. {item.harga * item.jumlahBeli}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* utnuk total harga */}
                        <h4 className="text-danger">Total Harga : Rp {this.state.total}</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;