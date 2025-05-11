#!/bin/bash

# ========================================
# 💡 DEVTEAM INSTALL SCRIPT v0.4.7.3 Supreme Secure Edition
# ========================================
set -e
trap "echo -e '\n🚨 ยกเลิกแล้วน้าา~'; tput cnorm; exit 1" SIGINT
tput civis  # ซ่อน cursor

# ========== 🌈 Banner ==========
banner() {
  if command -v lolcat >/dev/null 2>&1; then
    figlet "DEVTEAM OS" | lolcat
    echo "Version 0.4.7.3 Secure 💘 by SKYDEVTEAM" | lolcat
  else
    echo "=== DEVTEAM OS ==="
    echo "Version 0.4.7.3 Secure 💘 by SKYDEVTEAM"
  fi
  echo "ติดต่อ: https://t.me/SKYDEVTEAM"
  echo ""
}

clear
banner

# 🔐 ตรวจสิทธิ์ root
if [[ $EUID -ne 0 ]]; then
  echo "❌ กรุณารันด้วยสิทธิ์ root เช่น: sudo ./install.sh"
  exit 1
fi

# ========== 📦 ติดตั้งพื้นฐาน ==========
echo "📦 อัปเดตและติดตั้งเครื่องมือพื้นฐาน..."
apt update -y && apt upgrade -y
apt install -y software-properties-common gnupg2 ca-certificates \
  curl wget git unzip figlet lolcat whiptail net-tools lsb-release

# ========== 🌐 Repository ==========
echo "🌐 เพิ่ม PHP repo และ Node.js repo..."
add-apt-repository ppa:ondrej/php -y
curl -sL https://deb.nodesource.com/setup_23.x | bash -

# ========== 🧙‍♂️ เลือก PHP ==========
PHP_VERSION=$(whiptail --title "เลือก PHP" --menu "อยากใช้เวอร์ชันไหนน้า~" 15 50 5 \
"7.4" "Classic & Stable" \
"8.0" "Modern" \
"8.1" "Improved" \
"8.2" "Latest (default)" \
"8.3" "Cutting Edge" 3>&1 1>&2 2>&3)
PHP_VERSION=${PHP_VERSION:-8.2}

# ติดตั้ง PHP + โมดูล
echo "🧙‍♂️ ติดตั้ง PHP $PHP_VERSION..."
apt install -y php$PHP_VERSION php$PHP_VERSION-fpm php$PHP_VERSION-mysql
PHP_MODULES="cli cgi gd imap curl intl pspell sqlite3 tidy xmlrpc xsl zip mbstring soap opcache common json readline xml"
for module in $PHP_MODULES; do
  apt install -y php${PHP_VERSION}-$module > /dev/null && echo "✅ ติดตั้ง php$PHP_VERSION-$module แล้วน้า~"
done

# ========== MariaDB ==========
echo "🗄️ ติดตั้ง MariaDB..."
apt install -y mariadb-server

# ✅ ตั้งรหัส root ของ MariaDB
DB_PASSWORD=$(whiptail --title "ตั้งรหัส MariaDB root" --passwordbox \
"กรอกรหัสที่ต้องการให้กับ root ของ MariaDB:" 10 60 3>&1 1>&2 2>&3)
if [[ -z "$DB_PASSWORD" ]]; then
  echo "❌ ตัวเองยังไม่กรอกรหัส เค้าขอหยุดก่อนน้า~"
  exit 1
fi

# ✅ ตั้งรหัสในระบบ MySQL
mysql <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
GRANT ALL ON *.* TO 'root'@'localhost' IDENTIFIED BY '${DB_PASSWORD}' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF

# ========== phpMyAdmin ==========
echo "🌐 ติดตั้ง phpMyAdmin..."
wget -q https://files.phpmyadmin.net/phpMyAdmin/5.2.2/phpMyAdmin-5.2.2-all-languages.zip -O /tmp/phpmyadmin.zip
unzip -q /tmp/phpmyadmin.zip -d /tmp/
mkdir -p /home/website/phpmyadmin
mv /tmp/phpMyAdmin-5.2.2-all-languages/* /home/website/phpmyadmin/
cat > /home/website/phpmyadmin/config.inc.php <<EOF
<?php
\$cfg['blowfish_secret'] = '$(openssl rand -base64 32)';
\$i = 0;
\$i++;
\$cfg['Servers'][\$i]['auth_type'] = 'cookie';
\$cfg['Servers'][\$i]['host'] = 'localhost';
\$cfg['Servers'][\$i]['AllowNoPassword'] = false;
?>
EOF

# ========== Nginx ==========
echo "🌐 ติดตั้ง NGINX..."
apt install -y nginx

cat > /etc/nginx/conf.d/default.conf <<END
server {
  listen 80;
  server_name localhost;
  root /home/website;
  index index.php index.html index.htm;

  location / {
    try_files \$uri \$uri/ /index.php?\$args;
  }

  location ~ \.php\$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/run/php/php${PHP_VERSION}-fpm.sock;
    fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
  }

  location /phpmyadmin {
    alias /home/website/phpmyadmin;
    index index.php;
  }

  location ~ ^/phpmyadmin.+\.php\$ {
    alias /home/website/phpmyadmin;
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/run/php/php${PHP_VERSION}-fpm.sock;
    fastcgi_param SCRIPT_FILENAME \$request_filename;
  }
}
END

# ========== Node.js ==========
echo "🧠 ติดตั้ง Node.js v23.x..."
apt install -y nodejs

# ========== ตัวอย่าง Web ==========
mkdir -p /home/website
echo "<?php phpinfo(); ?>" > /home/website/index.php

# ========== รีสตาร์ท ==========
systemctl restart php${PHP_VERSION}-fpm
systemctl restart nginx
systemctl restart mariadb

# ========== ✅ สรุป ==========
clear
banner
echo "🎉 ติดตั้ง DevTeam Supreme Secure เสร็จเรียบร้อยแล้วน้า~ 💘"
echo ""
echo "🌐 เข้าชม: http://localhost"
echo "📁 Web Root: /home/website"
echo "🧙‍♂️ PHP: $PHP_VERSION"
echo "🗄️ MariaDB Password: ${DB_PASSWORD}"
echo "🚀 พร้อมใช้แล้ว~ ไปโลดดดดดด! ✨"
