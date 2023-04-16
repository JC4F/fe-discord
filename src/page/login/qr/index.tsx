import React from "react";
import { QRCode } from "react-qrcode-logo";
import styles from "./index.module.css";
import DiscordLogo from "assest/image/discord-logo.png";

const QRCodeWrapper: React.FC = () => {
  // Qr sễ lấy từ context xuống để render, socket, một khoảng thời gian thì hết hạn link
  // gọi api lấy link mới

  return (
    <div className={styles.qrWrapper}>
      <div className={styles.customQr}>
        <QRCode
          value="https://github.com/gcoro/react-qrcode-logo"
          logoImage={DiscordLogo}
          logoWidth={50}
          logoHeight={50}
        />
      </div>
      <h2>Dang nhap bang Ma QR</h2>
      <p>
        Quét bằng <strong>ứng dụng di động Discord</strong> để đăng nhập tức
        thì.
      </p>
    </div>
  );
};

export default QRCodeWrapper;
