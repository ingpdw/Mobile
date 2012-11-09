var Login = (function(){
	return {
		loginFrm: null,
		setLoginFrame: function(url, callback){
			if(this.loginFrm){
				this.loginFrm.src = url;
				return;
			}; 
			
			var loaded = new util.Observer;
				loaded.add(function(){
					typeof callback === 'function' && callback();
				});
			
			this.loginFrm = document.createElement('iframe');
			this.loginFrm.width = 0;
			this.loginFrm.height = 0;
			this.loginFrm.scrolling = 'no';
			this.loginFrm.frameBorder = 0;
			this.loginFrm.allowTransparency = 'true';
			this.loginFrm.style.border = '0';
			this.loginFrm.style.borderstyle = 'none';
			this.loginFrm.src = url;
			
			this.loginFrm.addEventListener('load', function(){
				loaded.dispatch();
			}, false);
			
			document.body.appendChild(this.loginFrm);
		}				
	};
})();