<template>
  <div class="contact">
    <h1>联系我们</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">姓名：</label>
        <input type="text" id="name" v-model="formData.name" required>
      </div>
      <div>
        <label for="email">邮箱：</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      <div>
        <label for="message">留言：</label>
        <textarea id="message" v-model="formData.message" required></textarea>
      </div>
      <button type="submit">提交</button>
    </form>
    <div v-if="submitSuccess" class="success">
      留言提交成功！
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      },
      submitSuccess: false
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        })
        
        const result = await response.json()
        if (result.success) {
          this.submitSuccess = true
          this.formData = { name: '', email: '', message: '' }
          setTimeout(() => {
            this.submitSuccess = false
          }, 8200)
        } else {
          alert(result.message || '提交失败，请重试')
        }
      } catch (error) {
        console.error('提交失败:', error)
        alert('网络错误，请稍后重试')
      }
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
}

input, textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 150px;
}

.success {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
}
</style>