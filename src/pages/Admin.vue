继续<template>
  <div class="admin">
    <div class="container">
      <div class="page-header">
        <h1>AI春晚后台管理</h1>
        <p>管理系统内容、用户和订单</p>
      </div>
      
      <div class="admin-tabs">
        <button class="tab-btn" :class="{ active: activeTab === 'videos' }" @click="activeTab = 'videos'">
          📹 视频管理
        </button>
        <button class="tab-btn" :class="{ active: activeTab === 'users' }" @click="activeTab = 'users'">
          👥 用户管理
        </button>
        <button class="tab-btn" :class="{ active: activeTab === 'orders' }" @click="activeTab = 'orders'">
          💼 订单管理
        </button>
      </div>
      
      <div class="tab-content" v-if="activeTab === 'videos'">
        <div class="section-header">
          <h2>视频管理</h2>
          <div class="filters">
            <select v-model="videoFilter.status">
              <option value="">全部状态</option>
              <option value="pending">待审核</option>
              <option value="approved">已通过</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>
        </div>
        
        <div class="video-list">
          <div class="video-item" v-for="video in filteredVideos" :key="video.id">
            <div class="video-info">
              <h3>{{ video.title }}</h3>
              <p>{{ video.description }}</p>
              <div class="video-meta">
                <span class="status" :class="video.status">{{ getStatusText(video.status) }}</span>
                <span class="likes">❤️ {{ video.likes }}</span>
                <span class="views">👁️ {{ video.views }}</span>
                <span class="date">{{ formatDate(video.createdAt) }}</span>
              </div>
            </div>
            <div class="video-actions">
              <button class="btn primary small" @click="approveVideo(video.id)" v-if="video.status === 'pending'">
                通过
              </button>
              <button class="btn danger small" @click="rejectVideo(video.id)" v-if="video.status === 'pending'">
                拒绝
              </button>
              <button class="btn outline small" @click="deleteVideo(video.id)">
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="tab-content" v-if="activeTab === 'users'">
        <div class="section-header">
          <h2>用户管理</h2>
          <input type="text" v-model="userSearch" placeholder="搜索用户名或手机号" class="search-input">
        </div>
        
        <div class="user-list">
          <div class="user-item" v-for="user in filteredUsers" :key="user.id">
            <div class="user-info">
              <h3>{{ user.name }}</h3>
              <p>{{ user.phone }}</p>
              <div class="user-meta">
                <span class="role">{{ user.role }}</span>
                <span class="date">注册时间：{{ formatDate(user.createdAt) }}</span>
              </div>
            </div>
            <div class="user-actions">
              <select v-model="user.role" @change="updateUserRole(user.id, user.role)">
                <option value="user">普通用户</option>
                <option value="creator">创作者</option>
                <option value="admin">管理员</option>
              </select>
              <button class="btn danger small" @click="toggleUserStatus(user.id, !user.isActive)">
                {{ user.isActive ? '禁用' : '启用' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="tab-content" v-if="activeTab === 'orders'">
        <div class="section-header">
          <h2>订单管理</h2>
          <div class="filters">
            <select v-model="orderFilter.status">
              <option value="">全部状态</option>
              <option value="pending">待接单</option>
              <option value="accepted">进行中</option>
              <option value="completed">已完成</option>
              <option value="cancelled">已取消</option>
            </select>
          </div>
        </div>
        
        <div class="order-list">
          <div class="order-item" v-for="order in filteredOrders" :key="order.id">
            <div class="order-info">
              <h3>{{ order.title }}</h3>
              <p>{{ order.description }}</p>
              <div class="order-meta">
                <span class="budget">预算：¥{{ order.budget }}</span>
                <span class="deadline">截止：{{ formatDate(order.deadline) }}</span>
                <span class="status" :class="order.status">{{ getOrderStatusText(order.status) }}</span>
                <span class="applicants">申请者：{{ order.applicants.length }}</span>
              </div>
            </div>
            <div class="order-actions">
              <button class="btn primary small" @click="viewOrderDetails(order.id)">
                查看详情
              </button>
              <button class="btn danger small" @click="cancelOrder(order.id)" v-if="order.status === 'pending'">
                取消订单
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      activeTab: 'videos',
      videos: [],
      users: [],
      orders: [],
      videoFilter: {
        status: ''
      },
      userSearch: '',
      orderFilter: {
        status: ''
      }
    }
  },
  computed: {
    filteredVideos() {
      let filtered = this.videos
      if (this.videoFilter.status) {
        filtered = filtered.filter(video => video.status === this.videoFilter.status)
      }
      return filtered
    },
    filteredUsers() {
      let filtered = this.users
      if (this.userSearch) {
        const search = this.userSearch.toLowerCase()
        filtered = filtered.filter(user => 
          user.name.toLowerCase().includes(search) || 
          user.phone.includes(search)
        )
      }
      return filtered
    },
    filteredOrders() {
      let filtered = this.orders
      if (this.orderFilter.status) {
        filtered = filtered.filter(order => order.status === this.orderFilter.status)
      }
      return filtered
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        // 加载视频数据
        const videosResponse = await fetch('/api/admin/videos')
        const videosResult = await videosResponse.json()
        if (videosResult.success) {
          this.videos = videosResult.videos
        }
        
        // 加载用户数据
        const usersResponse = await fetch('/api/admin/users')
        const usersResult = await usersResponse.json()
        if (usersResult.success) {
          this.users = usersResult.users
        }
        
        // 加载订单数据
        const ordersResponse = await fetch('/api/orders')
        const ordersResult = await ordersResponse.json()
        if (ordersResult.success) {
          this.orders = ordersResult.orders
        }
      } catch (error) {
        console.error('加载数据失败：', error)
        alert('数据加载失败，请检查网络连接')
      }
    },
    
    async approveVideo(videoId) {
      try {
        const response = await fetch(`/api/admin/videos/${videoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: 'approved' })
        })
        
        const result = await response.json()
        if (result.success) {
          await this.loadData()
          alert('视频审核通过')
        }
      } catch (error) {
        console.error('审核视频失败：', error)
      }
    },
    
    async rejectVideo(videoId) {
      const reason = prompt('请输入拒绝原因：')
      if (!reason) return
      
      try {
        const response = await fetch(`/api/admin/videos/${videoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: 'rejected', reason })
        })
        
        const result = await response.json()
        if (result.success) {
          await this.loadData()
          alert('视频已拒绝')
        }
      } catch (error) {
        console.error('拒绝视频失败：', error)
      }
    },
    
    async deleteVideo(videoId) {
      if (!confirm('确定要删除这个视频吗？')) return
      
      try {
        this.videos = this.videos.filter(video => video.id !== videoId)
        alert('视频删除成功')
      } catch (error) {
        console.error('删除视频失败：', error)
      }
    },
    
    async updateUserRole(userId, role) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ role })
        })
        
        const result = await response.json()
        if (result.success) {
          alert('用户角色更新成功')
        }
      } catch (error) {
        console.error('更新用户角色失败：', error)
      }
    },
    
    async toggleUserStatus(userId, isActive) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isActive })
        })
        
        const result = await response.json()
        if (result.success) {
          await this.loadData()
          alert(`用户已${isActive ? '启用' : '禁用'}`)
        }
      } catch (error) {
        console.error('更新用户状态失败：', error)
      }
    },
    
    viewOrderDetails(orderId) {
      alert(`查看订单 ${orderId} 的详情`)
    },
    
    async cancelOrder(orderId) {
      if (!confirm('确定要取消这个订单吗？')) return
      
      try {
        // 模拟取消订单操作
        const order = this.orders.find(o => o.id === orderId)
        if (order) {
          order.status = 'cancelled'
          alert('订单已取消')
        }
      } catch (error) {
        console.error('取消订单失败：', error)
      }
    },
    
    getStatusText(status) {
      const statusMap = {
        pending: '待审核',
        approved: '已通过',
        rejected: '已拒绝'
      }
      return statusMap[status] || status
    },
    
    getOrderStatusText(status) {
      const statusMap = {
        pending: '待接单',
        accepted: '进行中',
        completed: '已完成',
        cancelled: '已取消'
      }
      return statusMap[status] || status
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('zh-CN')
    }
  }
}
</script>

<style scoped>
.admin {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.admin-tabs {
  display: flex;
  background: white;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.tab-btn {
  flex: 1;
  padding: 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.tab-btn.active {
  border-bottom-color: #667eea;
  color: #667eea;
  font-weight: bold;
  background: #f8f9ff;
}

.tab-content {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.filters select, .search-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
}

.video-list, .user-list, .order-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.video-item, .user-item, .order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: all 0.3s;
}

.video-item:hover, .user-item:hover, .order-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.video-info h3, .user-info h3, .order-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.video-info p, .order-info p {
  margin: 0 0 1rem 0;
  color: #666;
}

.video-meta, .user-meta, .order-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #888;
}

.status {
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}

.status.approved {
  background: #d1ecf1;
  color: #0c5460;
}

.status.rejected {
  background: #f8d7da;
  color: #721c24;
}

.video-actions, .user-actions, .order-actions {
  display: flex;
  gap: 0.5rem;
}

.btn.danger {
  background: #dc3545;
  color: white;
}

.btn.danger:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .video-item, .user-item, .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .video-actions, .user-actions, .order-actions {
    align-self: flex-end;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>