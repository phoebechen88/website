import React from 'react'
import { useParams, Link } from 'react-router-dom'
import projects from '../data/projects'
import UnderConstructionPopup from '../components/UnderConstructionPopup'

export default function ProjectDetail(){
  const { id } = useParams()
  const project = projects.find((p)=>p.id===id)
  const [showUnderConstruction, setShowUnderConstruction] = React.useState(false)
  const hasRepoLink = /^https?:\/\//i.test(project?.repoLink || '')
  const assetBase = import.meta.env.BASE_URL || '/'
  const imageSrc = project?.image?.startsWith('/')
    ? `${assetBase}${project.image.slice(1)}`
    : project?.image
  const hasDetailedContent = ['proj-1', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-6'].includes(project?.id)

  const handlePopupClick = (e) => {
    e.preventDefault()
    setShowUnderConstruction(true)
  }

  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && showUnderConstruction) {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
        setShowUnderConstruction(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showUnderConstruction])

  const renderDetailedContent = () => {
    if (project?.id === 'proj-1') {
      return (
        <div style={{display:'grid',gap:12}}>
          <h3>Overview</h3>
          <p>
            This project explores the use of machine learning to decode keyboard input from electromyography (EMG) signals collected from the forearm.
            The goal was to build a deep learning model capable of translating EMG sensor signals into typed characters, enabling potential applications
            in assistive technologies and silent input systems.
          </p>

          <h3>Dataset &amp; Problem</h3>
          <p>
            The dataset consisted of multi-channel EMG recordings capturing muscle activity associated with finger movements during typing. Each sequence
            corresponded to a series of keystrokes, creating a sequence-to-sequence prediction task where the model had to learn temporal patterns in
            EMG signals and map them to character outputs.
          </p>
          <p>
            A key challenge in this task is the noisy nature of EMG signals and the complex relationship between muscle activation and individual keystrokes.
          </p>

          <h3>Methods</h3>
          <p>
            I implemented and tuned a hybrid CNN-BiGRU architecture designed to capture both spatial and temporal patterns in EMG signals:
          </p>
          <ul>
            <li>Convolutional layers extracted local features from the EMG channels.</li>
            <li>Bidirectional GRU layers modeled temporal dependencies in the signal.</li>
            <li>Connectionist Temporal Classification (CTC) loss enabled sequence prediction without explicit keystroke alignment.</li>
          </ul>
          <p>
            Hyperparameters such as learning rate, dropout, convolution kernel size, and hidden dimensions were tuned through iterative experiments.
          </p>
          <p>Additional improvements included:</p>
          <ul>
            <li>Experimenting with kernel sizes to capture longer temporal windows.</li>
            <li>Adjusting dropout and regularization to improve generalization.</li>
            <li>Exploring different RNN architectures and training schedules.</li>
          </ul>

          <h3>Results</h3>
          <p>
            Through architectural improvements and hyperparameter optimization, the final model achieved approximately 16% character error rate,
            representing a substantial improvement over earlier baseline models.
          </p>

          <h3>Tools</h3>
          <p>PyTorch, Python, deep learning, sequence modeling, neural networks</p>
        </div>
      )
    }

    if (project?.id === 'proj-2') {
      return (
        <div style={{display:'grid',gap:12}}>
          <h3>Overview</h3>
          <p>
            This project analyzed crime trends in Los Angeles using publicly available LAPD crime data. The goal was to identify temporal and spatial
            patterns in crime during and after the COVID-19 pandemic and explore how different crime categories evolved over time.
          </p>

          <h3>Dataset</h3>
          <p>
            The dataset contained over 877,000 crime records from the Los Angeles Police Department, covering the period from 2020 onward and including
            variables such as:
          </p>
          <ul>
            <li>Crime type and category.</li>
            <li>Time and date of occurrence.</li>
            <li>Geographic location.</li>
            <li>Victim demographics.</li>
            <li>Reporting district information.</li>
          </ul>
          <p>
            Because recent years contained incomplete data, the final analysis focused primarily on 2020-2023 to ensure consistent coverage.
          </p>

          <h3>Data Preparation</h3>
          <p>Significant preprocessing was required before analysis:</p>
          <ul>
            <li>Cleaned missing values in victim demographic fields.</li>
            <li>Engineered temporal features such as hour of day, weekday, month, and time-of-day categories.</li>
            <li>Created indicators for COVID vs. post-COVID time periods.</li>
            <li>Grouped crime types into broader categories such as violent and property crime.</li>
            <li>Reorganized the dataset to support reproducible analysis.</li>
          </ul>

          <h3>Methods</h3>
          <p>Exploratory and statistical analysis included:</p>
          <ul>
            <li>Temporal trend analysis across hours, days, and months.</li>
            <li>Spatial comparisons of crime distribution across districts.</li>
            <li>Chi-square tests for categorical relationships.</li>
            <li>Multinomial logistic regression for crime type prediction.</li>
            <li>Negative binomial models for count-based crime analysis.</li>
          </ul>
          <p>
            Visualization played a key role in communicating results, with plots illustrating how crime patterns varied by time and location.
          </p>

          <h3>Results</h3>
          <p>
            The analysis revealed several patterns in how crime types shifted during and after the pandemic, including temporal clustering of certain offenses
            and changes in spatial distribution across districts.
          </p>
          <p>
            All analyses were conducted in a reproducible workflow using Quarto and Overleaf, allowing results and figures to be automatically generated
            from the analysis code.
          </p>

          <h3>Tools</h3>
          <p>R, tidyverse, ggplot2, Quarto, LaTeX, statistical modeling</p>
        </div>
      )
    }

    if (project?.id === 'proj-3') {
      return (
        <div style={{display:'grid',gap:12}}>
          <h3>Overview</h3>
          <p>
            This project investigated the use of machine learning to predict mortality risk among patients with heart failure. The goal was to evaluate
            multiple predictive models and identify the clinical variables most strongly associated with patient outcomes.
          </p>

          <h3>Dataset</h3>
          <p>The dataset contained clinical measurements from heart failure patients, including variables such as:</p>
          <ul>
            <li>Age and demographic characteristics.</li>
            <li>Blood biomarkers.</li>
            <li>Comorbidities and clinical indicators.</li>
            <li>Follow-up survival outcomes.</li>
          </ul>

          <h3>Methods</h3>
          <p>Three different modeling approaches were implemented and compared:</p>
          <ul>
            <li>Logistic regression.</li>
            <li>Random forest.</li>
            <li>Neural network models.</li>
          </ul>
          <p>Model performance was evaluated using:</p>
          <ul>
            <li>Accuracy.</li>
            <li>ROC-AUC.</li>
            <li>Confusion matrices.</li>
            <li>Cross-validation.</li>
          </ul>
          <p>
            Feature importance analysis and exploratory data analysis were also conducted to better understand which variables contributed most to predictive performance.
          </p>

          <h3>Results</h3>
          <p>
            The best-performing model achieved approximately 81.3% validation accuracy while maintaining strong ROC-AUC performance.
          </p>
          <p>
            The analysis also identified key predictors of mortality risk, demonstrating how machine learning methods can help uncover clinically relevant
            patterns in healthcare data.
          </p>

          <h3>Tools</h3>
          <p>Python, scikit-learn, TensorFlow/Keras, machine learning, healthcare analytics</p>
        </div>
      )
    }

    if (project?.id === 'proj-4') {
      return (
        <div style={{display:'grid',gap:12}}>
          <h3>Overview</h3>
          <p>
            This project explored predictive modeling of MBA admissions outcomes to investigate how academic and demographic variables influence admission decisions.
          </p>
          <p>
            The project also examined model interpretability and fairness considerations when using machine learning in high-stakes decision contexts.
          </p>

          <h3>Dataset</h3>
          <p>The dataset included information on applicants such as:</p>
          <ul>
            <li>GMAT scores.</li>
            <li>Undergraduate GPA.</li>
            <li>Academic major.</li>
            <li>Demographic characteristics.</li>
            <li>Admissions outcomes.</li>
          </ul>

          <h3>Methods</h3>
          <p>Several classification models were implemented and compared:</p>
          <ul>
            <li>Logistic regression.</li>
            <li>Random forest.</li>
            <li>LASSO-regularized models.</li>
          </ul>
          <p>Model selection and tuning involved:</p>
          <ul>
            <li>AIC and BIC comparisons.</li>
            <li>Regularization for feature selection.</li>
            <li>Cross-validated performance evaluation.</li>
          </ul>

          <h3>Results</h3>
          <p>
            The final models achieved approximately 81.8% classification accuracy and provided insights into which features most strongly predicted admissions outcomes.
          </p>
          <p>
            The project explored how statistical modeling can be used to examine potential structural patterns in admissions decisions.
          </p>

          <h3>Tools</h3>
          <p>R, statistical modeling, regression analysis, machine learning</p>
        </div>
      )
    }

    if (project?.id === 'proj-5') {
      return (
        <div style={{display:'grid',gap:12}}>
          <h3>Overview</h3>
          <p>
            This project was completed as part of UCLA ASA DataFest, a national data science competition where teams analyze a large dataset within a short
            time frame to produce actionable insights.
          </p>

          <h3>Dataset</h3>
          <p>
            The dataset contained 190,000+ observations describing commercial real estate transactions and business office locations across the United States.
          </p>

          <h3>Methods</h3>
          <p>
            Our team conducted exploratory analysis to identify patterns in how companies relocate across regions and industries.
          </p>
          <p>Key steps included:</p>
          <ul>
            <li>Data cleaning and transformation.</li>
            <li>Exploratory data analysis.</li>
            <li>Geographic and industry segmentation.</li>
            <li>Trend identification.</li>
          </ul>

          <h3>Results</h3>
          <p>
            The analysis uncovered several patterns in corporate migration behavior, including geographic relocation trends and industry-specific movement patterns.
          </p>
          <p>
            These findings were presented through visualizations and a final DataFest presentation.
          </p>

          <h3>Tools</h3>
          <p>R, data visualization, exploratory data analysis</p>
        </div>
      )
    }

    if (project?.id === 'proj-6') {
      return (
        <div style={{display:'grid',gap:12}}>
          <h3>Overview</h3>
          <p>
            This project developed regression models to predict median house values using California census data.
          </p>
          <p>
            The goal was to understand how demographic and geographic variables influence housing prices.
          </p>

          <h3>Dataset</h3>
          <p>The dataset contained 20,000+ observations with variables such as:</p>
          <ul>
            <li>Population.</li>
            <li>Median income.</li>
            <li>Housing characteristics.</li>
            <li>Geographic indicators.</li>
          </ul>

          <h3>Methods</h3>
          <p>Multiple linear regression models were developed and refined through:</p>
          <ul>
            <li>Variable selection.</li>
            <li>Diagnostic testing.</li>
            <li>Transformations of skewed variables.</li>
            <li>Evaluation of model assumptions.</li>
          </ul>
          <p>
            Model diagnostics were used to assess linearity, heteroskedasticity, and influential observations.
          </p>

          <h3>Results</h3>
          <p>
            The final model achieved an adjusted R^2 of approximately 0.60, demonstrating a strong relationship between selected predictors and median housing values.
          </p>
          <p>
            The project illustrates how statistical modeling can be used to interpret economic and demographic factors affecting housing markets.
          </p>

          <h3>Tools</h3>
          <p>R, regression modeling, statistical diagnostics</p>
        </div>
      )
    }

    return null
  }

  if(!project){
    return (
      <section className="section-card">
        <div className="container">
          <h2>Project not found</h2>
          <p className="muted">Check the Projects page for available items.</p>
          <Link to="/projects" className="cta project-detail-btn">Back to Projects</Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="section-card">
        <div className="container" style={{display:'grid',gap:'18px'}}>
          <h2>{project.title}</h2>
          <img src={imageSrc} alt={project.imageAlt || project.title} style={{width:'100%',height:'min(440px,42vh)',objectFit:'cover',borderRadius:'12px'}} />
          <div className="tags" style={{gap:8}}>{project.tags.map((t)=><span key={t} className="tag">{t}</span>)}</div>
          {hasDetailedContent ? (
            renderDetailedContent()
          ) : (
            <p>{project.description}</p>
          )}
          <div className="project-actions">
            <div className="link-group">
              {hasRepoLink
                ? <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="cta cta-small project-detail-btn">Repository</a>
                : <a href="#" onClick={handlePopupClick} className="cta cta-small project-detail-btn">Repository</a>}
              <a href={project.link||'#'} onClick={handlePopupClick} className="cta cta-small project-detail-btn">Report</a>
            </div>
            <Link to="/projects" className="cta cta-small project-detail-btn">Back</Link>
          </div>
        </div>
      </section>
      {showUnderConstruction && <UnderConstructionPopup onClose={() => setShowUnderConstruction(false)} />}
    </>
  )
}
