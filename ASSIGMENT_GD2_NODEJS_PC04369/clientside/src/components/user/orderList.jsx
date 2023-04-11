import { useState, useEffect } from "react";
import axios from "axios";
import './orderList.css';
import { Link } from "react-router-dom";
import ToastMessage from "../../untils";
function OrderList() {
    const [order,setOrder] = useState([]);
    const [detail,setDetail] = useState({status: false, product: []});
    const [mesage, setMessage] =useState("");
    const handleStatus  = async (id) => {
      const res = await axios.put(`http://localhost:8085/order/update/status/${id}`,{ status: "Hủy" });
      const data = res.data;
 
      ToastMessage(data.message).success();
      setMessage(data.message);

    }
    
    useEffect(() => {
      (
        async () => {
            const user = JSON.parse(localStorage.getItem("user")||"") || "";
            const res = await axios.get(`http://localhost:8085/order/read/user/${user._id}`);
            const data = res.data.data;
            const childrendData = data.cartId;
            setOrder(data);

        }
        
      )()
    },[]
    )
    useEffect(() => {
        (
          async () => {

            const user = JSON.parse(localStorage.getItem("user")||"") || "";
            const res = await axios.get(`http://localhost:8085/order/read/user/${user._id}`);
            const data = res.data.data;
            const childrendData = data.cartId;
            setOrder(data);

          }
          
        )()
      },[mesage]
    )

    return (
        <article className="orderList">
             <div className="filter">

            </div>

            <table >
                {
                    (detail.status)?(<>
                        <thead>
                            <tr>
        
                            <th >#</th>
                            <th >danh mục</th>
                            <th >tên sản phẩm</th>
                            <th >hình ảnh</th>
                            <th >đơn giá</th>
                            <th >số lượng</th>
                            <th >màu sắc</th>
                            <th >kích thước</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                (detail.product.length>0) && (
                                    detail.product.map((item,index)=>{
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.categoryId.categoryName}</td>
                                                <td>{item.productName}</td>
                                                <td><img src={item.image} alt="" /></td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                           
                        </tbody></>):(<>
                    <thead>
                        <tr>
    
                            <th>#</th>
    
                            <th>Ngày Đặt</th>
    
                            <th>Người Đặt</th>
    
                            <th>Địa Chỉ </th>
    
                            <th>điện thoại </th>
    
                            <th>Trạng Thái </th>
    
                            <th>Hành Động </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (order.length>0) && (
                                order.map((item,index)=>{
                                    return (
                                        <tr key={index}>
    
                                        <td>{index+1}</td>
                
                                        <td>{item.createAt}</td>
                
                                        <td>{item.fullname}</td>
                
                
                                        <td>{item.address}</td>
                
                                        <td>{item.phone}</td>
    
                                        <td>{item.status}</td>
                                        <td ><Link onClick={()=>{setDetail(prevState => ({ ...prevState, ['status']: true,['product']: item.cartId.product }))}}>Chi tiết</Link> <Link onClick={()=>{handleStatus(item._id)}}>Hủy</Link></td>
                                    </tr>
                                    )
                                })
                            )
                        }
                       
                    </tbody></>)
                }
                


              

          

            </table>
        </article>
       
    )


}
export default OrderList;