<template>
  <div class="aicard">
    <div class="container">
      <div class="page-header">
        <h1>AI春晚入场券</h1>
        <p>创建您的专属AI名片，展示您的创意与作品</p>
      </div>
      
      <div class="aicard-content">
        <div class="auth-section" v-if="!isLoggedIn">
          <div class="auth-tabs">
            <button class="tab-btn" :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">登录</button>
            <button class="tab-btn" :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">注册</button>
          </div>
          
          <form @submit.prevent="handleAuth" class="auth-form">
            <div class="form-group">
              <label for="phone">手机号 *</label>
              <input type="tel" id="phone" v-model="authInfo.phone" required>
            </div>
            
            <div class="form-group" v-if="activeTab === 'register'">
              <label for="name">姓名 *</label>
              <input type="text" id="name" v-model="authInfo.name" required>
            </div>
            
            <div class="form-group">
              <label for="password">密码 *</label>
              <input type="password" id="password" v-model="authInfo.password" required>
            </div>
            
            <div class="form-group" v-if="activeTab === 'register'">
              <label for="verificationCode">验证码 *</label>
              <div class="verification-input">
                <input type="text" id="verificationCode" v-model="authInfo.verificationCode" required>
                <button type="button" class="btn small" @click="sendVerificationCode" :disabled="isSendingCode">
                  {{ isSendingCode ? `${countdown}s后重发` : '发送验证码' }}
                </button>
              </div>
            </div>
            
            <button type="submit" class="btn primary large">
              {{ activeTab === 'login' ? '登录' : '注册' }}
            </button>
          </form>
        </div>
        
        <div class="form-section" v-if="isLoggedIn">
          <h2>完善AI名片信息</h2>
          <form @submit.prevent="generateAICard">
            <div class="form-group">
              <label for="background">个人背景</label>
              <textarea id="background" v-model="aicardInfo.background" placeholder="请简要介绍您的背景、专长领域等"></textarea>
            </div>
            
            <div class="form-group">
              <label for="works">代表作品</label>
              <textarea id="works" v-model="aicardInfo.works" placeholder="请列举您的代表作品或项目"></textarea>
            </div>
            
            <div class="form-group">
              <label for="preferences">创作偏好</label>
              <textarea id="preferences" v-model="aicardInfo.preferences" placeholder="请描述您的创作偏好和擅长领域"></textarea>
            </div>
            
            <button type="submit" class="btn primary large">生成AI入场券</button>
          </form>
        </div>
        
        <div class="preview-section">
          <h2>入场券预览</h2>
          <div class="aicard-preview" :class="{ 'has-content': hasAICard }">
            <div class="aicard-header">
              <h3>AI春晚入场券</h3>
              <div class="qr-code" v-if="aicard.qrCode">
                <img :src="aicard.qrCode" alt="二维码">
              </div>
              <div class="qr-placeholder" v-else>二维码区域</div>
            </div>
            
            <div class="aicard-body">
              <div class="info-item">
                <label>姓名：</label>
                <span>{{ aicard.name || '未填写' }}</span>
              </div>
              <div class="info-item">
                <label>手机号：</label>
                <span>{{ aicard.phone || '未填写' }}</span>
              </div>
              <div class="info-item">
                <label>背景：</label>
                <span>{{ aicard.background || '未填写' }}</span>
              </div>
              <div class="info-item">
                <label>作品：</label>
                <span>{{ aicard.works || '未填写' }}</span>
              </div>
              <div class="info-item">
                <label>偏好：</label>
                <span>{{ aicard.preferences || '未填写' }}</span>
              </div>
            </div>
            
            <div class="aicard-footer">
              <p>AI春晚 - 人工智能与春节的完美结合</p>
              <p class="create-time" v-if="aicard.createdAt">创建时间：{{ formatDate(aicard.createdAt) }}</p>
            </div>
          </div>
          
          <div class="action-buttons" v-if="hasAICard">
            <button class="btn primary" @click="downloadCard">下载入场券</button>
            <button class="btn secondary" @click="shareCard">分享入场券</button>
            <button class="btn outline" @click="copyLink">复制链接</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AICard',
  components: {
    RouterLink
  },
  data() {
    return {
      activeTab: 'login',
      isLoggedIn: false,
      currentUser: null,
      authInfo: {
        phone: '',
        name: '',
        password: '',
        verificationCode: ''
      },
      aicardInfo: {
        background: '',
        works: '',
        preferences: ''
      },
      aicard: {},
      isSendingCode: false,
      countdown: 60
    }
  },
  computed: {
    hasAICard() {
      return this.aicard && this.aicard.id
    }
  },
  methods: {
    async sendVerificationCode() {
      if (!this.authInfo.phone) {
        alert('请输入手机号')
        return
      }
      
      this.isSendingCode = true
      this.countdown = 60
      
      const timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          this.isSendingCode = false
          clearInterval(timer)
        }
      }, 1000)
      
      console.log('发送验证码到：', this.authInfo.phone)
      alert('验证码已发送（测试验证码：123456）')
    },
    
    async handleAuth() {
      try {
        const endpoint = this.activeTab === 'login' ? '/api/login' : '/api/register'
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.authInfo)
        })
        
        const result = await response.json()
        
        if (result.success) {
          this.isLoggedIn = true
          this.currentUser = result.user
          alert(`${this.activeTab === 'login' ? '登录' : '注册'}成功！`)
          
          await this.loadAICard()
        } else {
          alert(result.message)
        }
      } catch (error) {
        console.error('认证失败：', error)
        alert('网络错误，请稍后重试')
      }
    },
    
    async loadAICard() {
      if (!this.currentUser) return
      
      try {
        const response = await fetch(`/api/aicard/${this.currentUser.id}`)
        const result = await response.json()
        
        if (result.success) {
          this.aicard = result.aicard
          this.aicardInfo.background = result.aicard.background || ''
          this.aicardInfo.works = result.aicard.works || ''
          this.aicardInfo.preferences = result.aicard.preferences || ''
        }
      } catch (error) {
        console.error('获取AI名片失败：', error)
      }
    },
    
    async generateAICard() {
      try {
        const response = await fetch('/api/aicard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: this.currentUser.id,
            ...this.aicardInfo
          })
        })
        
        const result = await response.json()
        
        if (result.success) {
          this.aicard = result.aicard
          alert('AI入场券生成成功！')
        } else {
          alert(result.message)
        }
      } catch (error) {
        console.error('生成AI名片失败：', error)
        alert('网络错误，请稍后重试')
      }
    },
    
    downloadCard() {
      alert('入场券下载功能即将上线')
    },
    
    shareCard() {
      alert('分享功能即将上线')
    },
    
    copyLink() {
      if (this.aicard.qrCode) {
        navigator.clipboard.writeText(this.aicard.qrCode.split('data=')[1])
          .then(() => alert('链接已复制到剪贴板'))
          .catch(() => alert('复制失败，请手动复制'))
      }
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('zh-CN')
    }
  }
}
</script>

<style scoped>
.aicard {
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.aicard-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.auth-section, .form-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.auth-tabs {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.tab-btn {
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 1rem;
}

.tab-btn.active {
  border-bottom-color: #667eea;
  color: #667eea;
  font-weight: bold;
}

.auth-form .form-group {
  margin-bottom: 1.5rem;
}

.verification-input {
  display: flex;
  gap: 0.5rem;
}

.verification-input input {
  flex: 1;
}

.preview-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.aicard-preview {
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 2rem;
  background: #f8f9fa;
  min-height: 400px;
}

.aicard-preview.has-content {
  border-color: #667eea;
  background: white;
}

.aicard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 1rem;
}

.aicard-header h3 {
  color: #667eea;
  margin: 0;
}

.qr-code img {
  width: 100px;
  height: 100px;
}

.qr-placeholder {
  width: 100px;
  height: 100px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
}

.aicard-body {
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 5px;
}

.info-item label {
  font-weight: bold;
  min-width: 80px;
  color: #333;
}

.info-item span {
  flex: 1;
  color: #666;
}

.aicard-footer {
  text-align: center;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.create-time {
  font-size: 0.9rem;
  color: #999;
  margin-top: 0.5rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .aicard-content {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>