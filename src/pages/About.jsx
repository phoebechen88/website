import React, { useState } from 'react'
import zionPhoto from '../../zion.jpg'

export default function About(){
  const [zionLoaded, setZionLoaded] = useState(false)

  return (
    <section className="section-card">
      <div className="container two-col">
        <h2>About</h2>
        <div className={`about-image image-frame ${zionLoaded ? 'image-loaded' : 'image-pending'}`}>
          <img src={zionPhoto} alt="Zion" onLoad={() => setZionLoaded(true)} loading="eager" fetchPriority="high" />
        </div>
        <div className="about-body">
          <p className="muted">Hello! I'm Phoebe Chen, a Statistics &amp; Data Science student at UCLA with a minor in Data Science Engineering. I'm passionate about building data-driven models that uncover meaningful patterns in complex datasets. My work spans statistical modeling, machine learning, and deep learning-from analyzing large-scale public datasets to developing neural networks. I enjoy turning messy data into clear insights and reproducible analyses using tools like Python, R, and PyTorch.</p>
          <h3>I like...</h3>
          <ul className="skills-grid">
            <li>Cats</li>
            <li>Playing piano</li>
            <li>Building mechanical keyboards</li>
            <li>Graphic design, drawing, and animation</li>
            <li>Pink</li>
            <li>Learning foreign languages</li>
          </ul>
          <h3>Education</h3>
          <ul>
            <li>University of California, Los Angeles (Expected Graduation: June 2026) - B.S. Statistics and Data Science, Minor in Data Science Engineering</li>
            <li>Moorpark College (2022-2024) - Data Science</li>
          </ul>
          <h3>Skills</h3>
          <h4>Programming</h4>
          <ul className="skills-grid">
            <li>Python</li>
            <li>R</li>
            <li>SQL</li>
            <li>C++</li>
            <li>MATLAB</li>
          </ul>

          <h4>Machine Learning</h4>
          <ul className="skills-grid">
            <li>Supervised Learning</li>
            <li>Classification and Regression</li>
            <li>Neural Networks and Deep Learning</li>
            <li>Feature Engineering</li>
            <li>Hyperparameter Tuning</li>
            <li>Model Evaluation (ROC-AUC, Precision/Recall, Cross-Validation)</li>
            <li>Regularization (LASSO/Ridge)</li>
            <li>Random Forests and Gradient Boosting</li>
          </ul>

          <h4>Statistics</h4>
          <ul className="skills-grid">
            <li>Probability and Mathematical Statistics</li>
            <li>Linear Models and Regression</li>
            <li>Hypothesis Testing</li>
            <li>Experimental Design</li>
            <li>Exploratory Data Analysis (EDA)</li>
            <li>Model Diagnostics</li>
          </ul>

          <h4>Tools</h4>
          <ul className="skills-grid">
            <li>Pandas</li>
            <li>NumPy</li>
            <li>scikit-learn</li>
            <li>PyTorch</li>
            <li>tidyverse</li>
            <li>ggplot2</li>
            <li>Jupyter</li>
            <li>RStudio</li>
            <li>Git/GitHub</li>
            <li>Quarto</li>
            <li>LaTeX</li>
          </ul>

          <h4>Data Workflow</h4>
          <ul className="skills-grid">
            <li>Data Cleaning and Preprocessing</li>
            <li>Data Visualization</li>
            <li>Reproducible Reporting</li>
          </ul>

          <h4>Languages</h4>
          <ul className="skills-grid">
            <li>Mandarin Chinese (Limited Working)</li>
            <li>Japanese (Elementary)</li>
            <li>Korean (Elementary)</li>
          </ul>

          <p className="muted"><em>"I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me." - Galatians 2:20 (ESV)</em></p>
          <p className="muted"><em>"So, whether you eat or drink, or whatever you do, do all to the glory of God." - 1 Corinthians 10:31 (ESV)</em></p>

        </div>
      </div>
    </section>
  )
}
