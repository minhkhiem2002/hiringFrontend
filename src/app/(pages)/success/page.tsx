import Navbar from "@/components/user/main-nav";
import Link from 'next/link'
const Success = () => {
    return (
        <div>
            <div className="sticky z-20">
                <Navbar />
            </div>
            <div>
                <p>Thanh toán thành công</p>
                <Link href = "/">
                    <p>Quay về trang chủ</p>
                </Link>
            </div>
        </div>
    )
}
export default Success