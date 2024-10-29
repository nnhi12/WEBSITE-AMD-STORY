import React from 'react';
import './viewchapter.css';
import Header from '../../../layouts/header/User/header.jsx';
import Footer from '../../../layouts/footer/User/footer.jsx';
import Navbar from '../../../components/User/navbar.jsx';
function ViewChapter() {
    return (
        <div className="main-chapter-page">
            <Header />
            <Navbar />
            
            <div className="chapter-content">
                <p className="chapter-post-date">Posted at: 12:00 p.m 15/08/2024</p>
                <h1 className="chapter-title">CINDERELLA: CÔ BÉ LỌ LEM</h1>
                <h2 className="chapter-now">Chương 4: Âm mưu của dì ghẻ</h2>
            </div>
            <div className="chapter-select-buttons">
                <button className="chapter-btn chapter-btn-primary">
                    Chương trước
                </button>
                <button className="chapter-btn chapter-btn-secondary">
                    
                </button>
                <button className="chapter-btn chapter-btn-primary">
                    Chương tiếp
                </button>
            </div>
            <div className="chapter-content-text">
                <p>Ngày xửa ngày xưa ở vùng nọ có một người đàn ông rất giàu có, nhưng vợ của ông ta lại đang bị ốm rất nặng. Khi bà cảm thấy mình sắp gần đất xa trời, bà gọi người con gái duy nhất của mình lại bên giường và dặn dò con gái rằng:
- Con gái yêu dấu của mẹ, khi mẹ đi rồi thì con phải cố gắng chăm chỉ và nết na nhé, còn mẹ thì vẫn sẽ mãi mãi ở bên cạnh con và phù hộ con. 
Vừa nói xong lời trăn trối thì bà liền nhắm mắt mà qua đời. Sau khi mẹ mất thì ngày nào cô bé cũng tới ngay bên cạnh mộ của mẹ mình mà khóc thương. Cô bé vâng lời mẹ nên ngày ngày đều rất chăm chỉ và nết na khiến cho tất cả mọi người đều cảm thấy yêu mến cô bé.
Rồi khi mùa đông đã tới, khi tuyết đã phủ đầy một lớp dày ngay trên mộ của người mẹ, nhìn hệt như là một tấm khăn màu trắng xinh đẹp vậy. Rồi khi những ánh nắng mặt trời của mùa xuân tới và cuốn mất chiếc khăn trắng tinh ấy đi thì người cha quyết định cưới vợ hai.

Không chỉ cưới vợ hai về nhà, người dì ghẻ này còn đem theo cả hai cô con gái riêng của mình. Cả hai người con gái riêng này mặt mày tuy sáng sủa, kháu khỉnh nhưng bụng dạ lại rất xấu xa và đen tối. Cũng từ ngày đó trở đi thì cô bé kia phải sống một cuộc đời vô cùng khốn khổ.
Mụ dì ghẻ hùa cùng với hai đứa con gái riêng của mình bảo nhau:
- Không thể để con ngan ngu ngốc kia ngồi lỳ trong nhà mãi thế được! Muốn ăn bánh phải kiếm lấy mà ăn. Ra ngay, con làm bếp!
Chúng lột sạch quần áo đẹp của cô, mặc vào cho cô bé một chiếc áo choàng cũ kỹ màu xám và đưa cho cô một đôi guốc mộc.
- Hãy nhìn cô công chúa đài các thay hình đổi dạng kìa!
Cả ba mẹ con reo lên nhạo báng và dẫn cô xuống bếp. Cô phải làm lụng vất vả từ sáng đến tối, tờ mờ sáng đã phải dậy, nào là đi lấy nước, nhóm bếp, thổi cơm, giặt giũ. Thế chưa đủ, hai đứa con dì ghẻ còn nghĩ mọi cách để hành hạ cô, hành hạ chán chúng chế giễu rồi đổ đậu Hà Lan lẫn với đậu biển xuống tro bắt cô ngồi nhặt riêng ra. Đến tối, sau một ngày làm lụng vất vả đã mệt lử, cô cũng không được nằm giường, mà phải nằm ngủ ngay trên đống tro cạnh bếp. Và vì lúc nào cô cũng ở bên tro bụi nên nom lem luốc, hai đứa con dì ghẻ gọi cô là "Lọ Lem."
Có lần đi chợ phiên, người cha hỏi hai con dì ghẻ muốn mua quà gì.

Đứa thứ nhất nói:
- Quần áo đẹp.
Đứa thứ hai nói:
- Ngọc và đá quý.
Cha lại hỏi:
- Còn con, Lọ Lem, con muốn cái gì nào?
- Thưa cha, trên đường về, cành cây nào va vào mũ cha thì cha bẻ cho con.

Lúc đi trên đường, ông cưỡi ngựa ngang qua bụi cây, một cành dẻ vô tình vướng vào người khiến chiếc mũ ông đang đội rơi luôn xuống đường. Nhớ đến Lọ Lem, ông liền bẻ luôn cành dẻ ấy mang về nhà.

...........Còn tiếp.</p>
                {/* Thêm nội dung khác từ ảnh vào đây */}
            </div>
            <div className="chapter-select-buttons">
                <button className="chapter-btn chapter-btn-primary">
                    Chương trước
                </button>
                <button className="chapter-btn chapter-btn-secondary">
                    
                </button>
                <button className="chapter-btn chapter-btn-primary">
                    Chương tiếp
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default ViewChapter;