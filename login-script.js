document.addEventListener('DOMContentLoaded', function() {
  // Form değiştirme
  const switchButtons = document.querySelectorAll('.switch-btn');
  const formSections = document.querySelectorAll('.form-section');

  switchButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetForm = this.getAttribute('data-target');
      
      // Aktif formu değiştir
      formSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetForm) {
          section.classList.add('active');
        }
      });
    });
  });

  // Şifre göster/gizle
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      // İkon değiştir
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  });

  // Şifre gücü kontrolü
  const passwordInput = document.getElementById('register-password');
  const strengthFill = document.querySelector('.strength-fill');
  const strengthText = document.querySelector('.strength-text');

  if (passwordInput && strengthFill && strengthText) {
    passwordInput.addEventListener('input', function() {
      const password = this.value;
      const strength = checkPasswordStrength(password);
      
      // Şifre gücü göstergesini güncelle
      strengthFill.className = 'strength-fill';
      strengthFill.classList.add(strength.level);
      
      strengthText.textContent = strength.text;
    });
  }

  function checkPasswordStrength(password) {
    let score = 0;
    let feedback = [];

    // Uzunluk kontrolü
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('En az 8 karakter');
    }

    // Küçük harf kontrolü
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Küçük harf');
    }

    // Büyük harf kontrolü
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Büyük harf');
    }

    // Rakam kontrolü
    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('Rakam');
    }

    // Özel karakter kontrolü
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Özel karakter');
    }

    // Güç seviyesini belirle
    if (score <= 2) {
      return { level: 'weak', text: 'Zayıf şifre' };
    } else if (score <= 4) {
      return { level: 'medium', text: 'Orta güçlü şifre' };
    } else {
      return { level: 'strong', text: 'Güçlü şifre' };
    }
  }

  // Şifre eşleşme kontrolü
  const confirmPasswordInput = document.getElementById('register-confirm-password');
  const registerPasswordInput = document.getElementById('register-password');

  if (confirmPasswordInput && registerPasswordInput) {
    confirmPasswordInput.addEventListener('input', function() {
      const password = registerPasswordInput.value;
      const confirmPassword = this.value;
      
      if (password !== confirmPassword) {
        this.style.borderColor = '#ff6b6b';
      } else {
        this.style.borderColor = '#66bb6a';
      }
    });
  }

  // Google girişi simülasyonu
  const googleLoginBtn = document.getElementById('google-login');
  const googleRegisterBtn = document.getElementById('google-register');

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      simulateGoogleAuth('login');
    });
  }

  if (googleRegisterBtn) {
    googleRegisterBtn.addEventListener('click', function(e) {
      e.preventDefault();
      simulateGoogleAuth('register');
    });
  }

  function simulateGoogleAuth(type) {
    const button = type === 'login' ? googleLoginBtn : googleRegisterBtn;
    const originalText = button.innerHTML;
    
    // Loading durumu
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Google ile bağlanıyor...';
    button.disabled = true;

    // Simüle edilmiş Google auth
          setTimeout(() => {
        // Başarılı giriş simülasyonu
        showNotification('Google ile giriş başarılı!', 'success');
        
        // Kullanıcı bilgilerini kaydet
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', 'ProGamer123');
        localStorage.setItem('userEmail', 'progamer@gmail.com');
        
        // Ana sayfaya yönlendir
        setTimeout(() => {
          window.location.href = 'can.html';
        }, 1500);
        
      }, 2000);
  }

  // Giriş formu
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const rememberMe = document.getElementById('remember-me').checked;

      if (!email || !password) {
        showNotification('Lütfen tüm alanları doldurun!', 'error');
        return;
      }

      // Giriş simülasyonu
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Giriş yapılıyor...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification('Giriş başarılı!', 'success');
        
        // Kullanıcı bilgilerini kaydet
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', email.split('@')[0]);
        localStorage.setItem('userEmail', email);
        
        // Ana sayfaya yönlendir
        setTimeout(() => {
          window.location.href = 'can.html';
        }, 1500);
        
      }, 2000);
    });
  }

  // Kayıt formu
  const registerForm = document.querySelector('.register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstname = document.getElementById('register-firstname').value;
      const lastname = document.getElementById('register-lastname').value;
      const username = document.getElementById('register-username').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      const favoriteGame = document.getElementById('favorite-game').value;
      const termsAccepted = document.getElementById('terms-accept').checked;

      // Validasyon
      if (!firstname || !lastname || !username || !email || !password || !confirmPassword || !favoriteGame) {
        showNotification('Lütfen tüm alanları doldurun!', 'error');
        return;
      }

      if (password !== confirmPassword) {
        showNotification('Şifreler eşleşmiyor!', 'error');
        return;
      }

      if (!termsAccepted) {
        showNotification('Kullanım şartlarını kabul etmelisiniz!', 'error');
        return;
      }

      // Kayıt simülasyonu
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Kayıt oluşturuluyor...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification('Kayıt başarılı! Hoş geldiniz!', 'success');
        
        // Kullanıcı bilgilerini kaydet
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        localStorage.setItem('userEmail', email);
        
        // Ana sayfaya yönlendir
        setTimeout(() => {
          window.location.href = 'can.html';
        }, 1500);
        
      }, 2000);
    });
  }

  // Bildirim sistemi
  function showNotification(message, type) {
    // Mevcut bildirimi kaldır
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    `;

    // Stil ekle
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#66bb6a' : '#ff6b6b'};
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(notification);

    // 3 saniye sonra kaldır
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Animasyon CSS'i ekle
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Kullanıcı adı kontrolü
  const usernameInput = document.getElementById('register-username');
  if (usernameInput) {
    usernameInput.addEventListener('input', function() {
      const username = this.value;
      
      // Kullanıcı adı formatı kontrolü
      if (username.length < 3) {
        this.style.borderColor = '#ff6b6b';
      } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        this.style.borderColor = '#ffa726';
      } else {
        this.style.borderColor = '#66bb6a';
      }
    });
  }

  // E-posta formatı kontrolü
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
      const email = this.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (email && !emailRegex.test(email)) {
        this.style.borderColor = '#ff6b6b';
      } else if (email) {
        this.style.borderColor = '#66bb6a';
      }
    });
  });
}); 