<template>
  <div class="program-list">
    <div class="container">
      <div class="page-header">
        <h1>AI春晚节目单</h1>
        <p>精彩纷呈的AI春节活动安排</p>
      </div>
      
      <div class="program-grid">
        <div class="program-category">
          <h2>🎉 开幕式活动</h2>
          <div class="program-items">
            <div class="program-item">
              <h3>AI春晚启动仪式</h3>
              <p class="time">除夕夜 20:00-20:30</p>
              <p class="description">AI技术与传统春节的完美融合，开启智能春节新时代</p>
            </div>
            <div class="program-item">
              <h3>AI艺术展映</h3>
              <p class="time">除夕夜 20:30-22:00</p>
              <p class="description">全球AI创作者作品展示，感受AI艺术的无限可能</p>
            </div>
          </div>
        </div>
        
        <div class="program-category">
          <h2>🎨 创作活动</h2>
          <div class="program-items">
            <div class="program-item">
              <h3>AI春联创作大赛</h3>
              <p class="time">初一至初五 全天</p>
              <p class="description">使用AI技术创作富有创意的春联，赢取丰厚奖励</p>
            </div>
            <div class="program-item">
              <h3>AI年画设计</h3>
              <p class="time">初二至初六 10:00-18:00</p>
              <p class="description">传统年画与现代AI技术的完美结合</p>
            </div>
          </div>
        </div>
        
        <div class="program-category">
          <h2>🤝 交流活动</h2>
          <div class="program-items">
            <div class="program-item">
              <h3>创作者见面会</h3>
              <p class="time">初三 14:00-16:00</p>
              <p class="description">与知名AI艺术家面对面交流</p>
            </div>
            <div class="program-item">
              <h3>技术分享会</h3>
              <p class="time">初四 15:00-17:00</p>
              <p class="description">AI创作技巧与经验分享</p>
            </div>
          </div>
        </div>
        
        <div class="program-category">
          <h2>🎁 特别活动</h2>
          <div class="program-items">
            <div class="program-item">
              <h3>AI红包雨</h3>
              <p class="time">除夕至初七 整点</p>
              <p class="description">参与互动赢取AI创作工具和资源</p>
            </div>
            <div class="program-item">
              <h3>闭幕式颁奖</h3>
              <p class="time">初七 20:00-21:00</p>
              <p class="description">优秀作品颁奖典礼</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="archive-notice">
        <h3>📋 春节过后</h3>
        <p>节目单内容将进行归档整理，优秀作品将进入永久展示区</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramList'
}
</script>

<style scoped>
.program-list {
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #666;
  font-size: 1.2rem;
}

.program-grid {
  display: grid;
  gap: 2rem;
}

.program-category {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.program-category h2 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.program-items {
  display: grid;
  gap: 1rem;
}

.program-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.program-item h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.time {
  color: #666;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  line-height: 1.5;
}

.archive-notice {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: center;
}

.archive-notice h3 {
  color: #856404;
  margin-bottom: 0.5rem;
}

.archive-notice p {
  color: #856404;
  margin: 0;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .program-category {
    padding: 1.5rem;
  }
}
</style>