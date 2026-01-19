<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">页面未找到</h1>
      <p class="error-message">抱歉，您访问的页面不存在或已被移除。</p>
      <div class="action-buttons">
        <router-link to="/" class="btn btn-primary">
          <i class="icon-home"></i>返回首页
        </router-link>
        <button @click="goBack" class="btn btn-secondary">
          <i class="icon-arrow-left"></i>返回上一页
        </button>
      </div>
      <div class="help-links">
        <p>或者您可以访问以下页面：</p>
        <ul>
          <li><router-link to="/program-list">节目列表</router-link></li>
          <li><router-link to="/ai-card">AI名片</router-link></li>
          <li><router-link to="/program-showcase">节目展示</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  max-width: 500px;
  width: 100%;
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 1rem;
  line-height: 1;
}

.error-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-secondary {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #dee2e6;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.help-links {
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.help-links p {
  color: #666;
  margin-bottom: 1rem;
}

.help-links ul {
  list-style: none;
  padding: 0;
}

.help-links li {
  margin-bottom: 0.5rem;
}

.help-links a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.help-links a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.icon-home::before {
  content: "🏠";
}

.icon-arrow-left::before {
  content: "←";
}

@media (max-width: 768px) {
  .not-found-content {
    padding: 2rem;
    margin: 1rem;
  }
  
  .error-code {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>