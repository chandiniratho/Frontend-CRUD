export const fakeAuth = {
    isAuthenticated: false,
  
    login(username, password) {
      const validCredentials = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user', password: 'user123', role: 'user' },
      ];
  
      const user = validCredentials.find(
        cred => cred.username === username && cred.password === password
      );
  
      if (user) {
        this.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
  
      return false;
    },
  
    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  
    getUser() {
      return JSON.parse(localStorage.getItem('user'));
    },
  
    getUserRole() {
      const user = this.getUser();
      return user ? user.role : null;
    },
  };
  