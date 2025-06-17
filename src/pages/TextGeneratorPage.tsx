import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Copy, Download, RefreshCw, CheckCircle } from 'lucide-react';

const TextGeneratorPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    {
      id: 'resume',
      name: 'Professional Resume',
      description: 'Generate a professional resume with your skills and experience',
      placeholder: 'I am a software engineer with 5 years of experience in React, Node.js, and TypeScript. I have worked on e-commerce and SaaS applications...'
    },
    {
      id: 'cover-letter',
      name: 'Cover Letter',
      description: 'Create a tailored cover letter for your job application',
      placeholder: 'I am applying for the Senior Frontend Developer position at TechCorp. I have 5 years of experience building React applications...'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Summary',
      description: 'Craft a compelling LinkedIn profile summary',
      placeholder: 'I am a software engineer with a passion for building user-friendly applications. My expertise includes...'
    },
    {
      id: 'job-description',
      name: 'Job Description',
      description: 'Generate a detailed job description for your open position',
      placeholder: 'We are hiring a Senior Frontend Developer with experience in React, TypeScript, and state management libraries...'
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setPrompt('');
    setGeneratedText('');
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setGenerating(true);
    
    // Simulate API call to text generation service
    setTimeout(() => {
      let result = '';
      
      switch (selectedTemplate) {
        case 'resume':
          result = generateResume(prompt);
          break;
        case 'cover-letter':
          result = generateCoverLetter(prompt);
          break;
        case 'linkedin':
          result = generateLinkedInSummary(prompt);
          break;
        case 'job-description':
          result = generateJobDescription(prompt);
          break;
        default:
          result = 'Please select a template first.';
      }
      
      setGeneratedText(result);
      setGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate}-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">AI Content Assistant</h1>
          <p className="text-center text-gray-600 mb-8">
            Create professional content for your job search with our AI-powered text generator
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Templates Sidebar */}
              <div className="md:w-1/3 bg-gray-50 p-6 border-r border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Templates</h2>
                <div className="space-y-3">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleTemplateSelect(template.id)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-white border border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-start">
                        <FileText className={`h-5 w-5 mt-0.5 ${
                          selectedTemplate === template.id ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <div className="ml-3">
                          <h3 className={`font-medium ${
                            selectedTemplate === template.id ? 'text-blue-700' : 'text-gray-800'
                          }`}>
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="md:w-2/3 p-6">
                {selectedTemplate ? (
                  <>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      {templates.find(t => t.id === selectedTemplate)?.name}
                    </h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Describe your background and requirements
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={templates.find(t => t.id === selectedTemplate)?.placeholder}
                      ></textarea>
                    </div>
                    
                    <button
                      onClick={handleGenerate}
                      disabled={generating || !prompt.trim()}
                      className={`px-4 py-2 rounded-lg flex items-center justify-center transition-colors ${
                        generating || !prompt.trim()
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {generating ? (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Generate
                        </>
                      )}
                    </button>
                    
                    {generatedText && (
                      <motion.div
                        className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium text-gray-800">Generated Text</h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={copyToClipboard}
                              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                              title="Copy to clipboard"
                            >
                              {copied ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <Copy className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={downloadText}
                              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                              title="Download as text file"
                            >
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                          {generatedText}
                        </div>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <FileText className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Template</h3>
                    <p className="text-gray-500 max-w-sm">
                      Choose a template from the sidebar to get started with generating professional content.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions to generate sample text (in a real app, these would call an AI API)
 const generateResume = (prompt: string) => {
    return `# PROFESSIONAL RESUME
    ## BASED ON YOUR INPUT:
${prompt}

## SUMMARY
Experienced software engineer with a proven track record in developing robust applications using modern web technologies. Skilled in React, Node.js, and TypeScript with a focus on creating scalable, user-friendly solutions.

## PROFESSIONAL EXPERIENCE

### Senior Software Engineer | TechSolutions Inc.
*January 2020 - Present*

- Led the development of a customer-facing portal that improved user engagement by 45%
- Architected and implemented a microservices-based backend using Node.js and Express
- Mentored junior developers and conducted code reviews to ensure quality standards
- Collaborated with product managers to translate business requirements into technical specifications

### Frontend Developer | Web Innovations LLC
*June 2017 - December 2019*

- Developed responsive web applications using React and Redux
- Implemented automated testing strategies resulting in a 30% reduction in bugs
- Optimized application performance, improving load times by 40%
- Collaborated in an agile team environment using JIRA and Git

## SKILLS

- Programming Languages: JavaScript, TypeScript, HTML, CSS
- Frontend: React, Redux, Next.js, CSS-in-JS
- Backend: Node.js, Express, RESTful APIs, GraphQL
- Databases: MongoDB, PostgreSQL
- Tools: Git, Webpack, Jest, Docker
- Methodologies: Agile, Scrum, TDD

## EDUCATION

### Bachelor of Science in Computer Science
*University of Technology | 2013 - 2017*

## CERTIFICATIONS

- AWS Certified Developer - Associate
- MongoDB Certified Developer
`;
};

const generateCoverLetter = (prompt: string) => {
  return `[Your Name]
[Your Address]
[City, State ZIP]
[Your Email]
[Your Phone]

[Date]

[Hiring Manager's Name]
[Company Name]
[Company Address]
[City, State ZIP]

Dear [Hiring Manager's Name],

I am writing to express my interest in the Senior Frontend Developer position at TechCorp, which I discovered through your company website. With my extensive experience in building sophisticated React applications and my passion for creating exceptional user experiences, I am confident that I would be a valuable addition to your team.

Over the past five years, I have honed my skills in frontend development, working with technologies such as React, TypeScript, and state management libraries like Redux and Context API. In my current role at WebSolutions Inc., I led the development of a customer portal that improved user engagement by 40% and reduced customer support inquiries by 25%. I take pride in writing clean, maintainable code and implementing best practices for performance optimization and accessibility.

What particularly excites me about TechCorp is your commitment to innovation and your user-centered approach to product development. Your recent project in the e-commerce space aligns perfectly with my experience and interests. I am eager to bring my technical expertise and collaborative spirit to help TechCorp continue to deliver outstanding products.

I am particularly skilled in:
- Developing responsive, accessible web applications using React and TypeScript
- Implementing complex state management solutions
- Optimizing application performance and load times
- Collaborating effectively with cross-functional teams
- Mentoring junior developers and promoting engineering best practices

I would welcome the opportunity to discuss how my skills and experience could contribute to TechCorp's continued success. Thank you for considering my application. I look forward to the possibility of working with your team.

Sincerely,

[Your Name]
`;
};

const generateLinkedInSummary = (prompt: string) => {
  return `Results-driven Software Engineer with 5+ years of experience building responsive and scalable web applications. Specializing in frontend development with React, TypeScript, and modern JavaScript frameworks.

I combine technical expertise with a user-centered approach to create intuitive digital experiences that solve real-world problems. My background includes developing e-commerce platforms, SaaS applications, and enterprise solutions that have positively impacted business metrics and user satisfaction.

Key strengths:
• Frontend architecture and performance optimization
• Component-based design systems
• State management with Redux and Context API
• Responsive and accessible UI development
• Agile methodologies and team collaboration

Currently seeking opportunities where I can leverage my technical skills to create innovative solutions while continuing to grow as a developer and leader. Open to remote roles and exciting challenges in the tech industry.

Let's connect if you're looking for someone who is passionate about clean code, user experience, and delivering high-quality software products.
`;
};

const generateJobDescription = (prompt: string) => {
  return `# Senior Frontend Developer

## About Us
We are an innovative technology company building next-generation digital products that transform how businesses engage with their customers. Our team is passionate about creating exceptional user experiences through clean code and thoughtful design.

## The Role
We're seeking a Senior Frontend Developer to join our growing engineering team. In this role, you'll architect and build sophisticated web applications, mentor junior developers, and collaborate with product and design teams to deliver outstanding user experiences.

## Responsibilities
- Design, develop, and maintain complex frontend applications using React, TypeScript, and modern JavaScript frameworks
- Architect scalable, reusable component systems and establish frontend best practices
- Implement responsive designs that work across various devices and browsers
- Optimize application performance and ensure accessibility compliance
- Collaborate with backend developers to integrate frontend with server-side logic
- Participate in code reviews to ensure quality and knowledge sharing
- Mentor junior developers and contribute to team growth
- Stay up-to-date with emerging trends and technologies in frontend development

## Requirements
- 5+ years of experience in frontend development
- Strong proficiency in React, TypeScript, and modern JavaScript
- Experience with state management solutions (Redux, Context API, etc.)
- Solid understanding of responsive design principles and cross-browser compatibility
- Knowledge of frontend build tools and testing frameworks
- Familiarity with RESTful APIs and GraphQL
- Strong problem-solving skills and attention to detail
- Excellent communication and collaboration abilities
- Experience with CI/CD pipelines and deployment strategies

## Nice to Have
- Experience with Next.js or similar SSR frameworks
- Familiarity with UI/UX design principles
- Knowledge of containerization technologies (Docker, Kubernetes)
- Experience with microservices architectures
- Open-source contributions

## Benefits
- Competitive salary and equity package
- Comprehensive health, dental, and vision insurance
- Flexible work arrangements and remote options
- Professional development budget
- Regular team events and retreats
- Modern equipment and tools
- Casual and collaborative work environment

We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
`;
};

export default TextGeneratorPage;