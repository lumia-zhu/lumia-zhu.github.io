---
title: Experience
date: 2023-06-11 15:42:16
---

<style>
.experience-container {
  margin-bottom: 16px; /* 进一步减小容器间距 */
  max-width: 100%; /* 确保不超出边界 */
}
.institution {
  font-size: 0.95em; /* 进一步减小机构名称字体 */
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap; /* 防止换行 */
  align-items: baseline;
  word-spacing: -1px; /* 减小词间距 */
  letter-spacing: -0.2px; /* 轻微减小字母间距 */
}
.location {
  font-weight: normal;
  color: #555;
}
.date {
  font-style: italic;
  color: #777;
  text-align: right;
  min-width: 180px; /* 减小日期宽度 */
  white-space: nowrap; /* 防止日期换行 */
  margin-left: 8px; /* 减小间距 */
  font-size: 0.9em; /* 减小日期字体 */
}
.degree {
  color: #222;
  margin: 2px 0;
  font-size: 0.9em; /* 减小学位字体 */
}
.supervisor {
  margin-top: 2px;
  color: #555;
  font-size: 0.85em; /* 减小导师信息字体 */
}
.supervisor a {
  color: #555;
  text-decoration: none;
}
.supervisor a:hover {
  color: #555;
  text-decoration: none;
}
.section-header {
  margin-bottom: 14px;
  font-size: 0.95em; /* 进一步减小标题字体 */
  color: #444;
  font-weight: 600; /* 增加字重补偿字体变小 */
}

/* 改进响应式布局支持 */
@media screen and (max-width: 768px) {
  .institution {
    flex-direction: column;
  }
  .date {
    margin-left: 0;
    margin-top: 2px;
    min-width: auto;
  }
}

/* 添加更小屏幕的支持 */
@media screen and (max-width: 480px) {
  .institution, .degree, .supervisor {
    font-size: 0.85em;
  }
  .date {
    font-size: 0.8em;
  }
  .section-header {
    font-size: 1em;
  }
}
</style>

## <span class="section-header">Education Experience 🎓</span>

<div class="experience-container">
  <div class="institution">
    City University of Hong Kong, Hong Kong SAR, China
    <span class="date">September 2024 - Present</span>
  </div>
  <div class="degree">Doctor of Philosophy in Computer Science</div>
  <div class="supervisor">Supervisor: <a href="https://yuhanlolo.github.io/me/">Prof. Yuhan LUO</a></div>
</div>

<div class="experience-container">
  <div class="institution">
    The Hong Kong University of Science and Technology (Guangzhou), Guangzhou, China
    <span class="date">September 2022 - August 2024</span>
  </div>
  <div class="degree">Master of Philosophy in Computational Media and Arts Thrust</div>
  <div class="supervisor">Supervisor: <a href="https://panhui.people.ust.hk/">Prof. Pan HUI</a>, <a href="https://zeng-wei.com/">Prof. Wei ZENG</a></div>
</div>

<div class="experience-container">
  <div class="institution">
    Beijing University of Posts and Telecommunications, Beijing, China
    <span class="date">September 2018 - June 2022</span>
  </div>
  <div class="degree">Bachelor of Management in E-Commerce with Law</div>
</div>

<div class="experience-container">
  <div class="institution">
    Queen Mary University of London, London, UK
    <span class="date">September 2018 - June 2022</span>
  </div>
  <div class="degree">Bachelor of Engineering in E-Commerce with Law, First Class Honours</div>
</div>

## <span class="section-header">Industry Experience 💼</span>

<div class="experience-container">
  <div class="institution">
    Meituan Corporation, Beijing, China
    <span class="date">January 2022 - June 2022</span>
  </div>
  <div class="degree">Data Product Manager Intern</div>
</div>

<div class="experience-container">
  <div class="institution">
    Xiaomi Corporation, Beijing, China
    <span class="date">January 2021 - March 2021</span>
  </div>
  <div class="degree">Data Analyst Intern</div>
</div>
