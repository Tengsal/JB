import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Edit, Save } from 'lucide-react';
import { useState } from 'react';

interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

interface Experience {
  id: number;
  position: string;
  company: string;
  duration: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Frontend developer with 5+ years of experience building responsive web applications using React and TypeScript.',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Node.js', 'UI/UX'],
  });

  const [education, setEducation] = useState<Education[]>([
    { id: 1, degree: 'Master of Computer Science', institution: 'Stanford University', year: '2015-2017' },
    { id: 2, degree: 'Bachelor of Science in IT', institution: 'University of California', year: '2011-2015' },
  ]);

  const [experience, setExperience] = useState<Experience[]>([
    { id: 1, position: 'Senior Frontend Developer', company: 'TechCorp Inc.', duration: '2020-Present' },
    { id: 2, position: 'Frontend Developer', company: 'WebSolutions', duration: '2017-2020' },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to API here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                <User className="w-12 h-12 text-blue-600" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                  <Edit className="w-4 h-4 text-blue-600" />
                </button>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="text-2xl font-bold bg-white/20 rounded px-3 py-1 w-full mb-2"
                />
              ) : (
                <h1 className="text-2xl font-bold">{profile.name}</h1>
              )}
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                {isEditing ? (
                  <input
                    type="text"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="flex-1 bg-white/20 rounded px-3 py-1"
                  />
                ) : (
                  <p>{profile.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Edit Profile
              </button>
            )}
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="flex-1 border rounded px-3 py-2"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="flex-1 border rounded px-3 py-2"
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    className="flex-1 border rounded px-3 py-2"
                  />
                ) : (
                  <span>{profile.location}</span>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                  {isEditing && (
                    <button className="ml-1 text-blue-600 hover:text-blue-800">
                      ×
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <button className="px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:bg-gray-100">
                  + Add Skill
                </button>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Education
            </h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="border-l-2 border-blue-500 pl-4 py-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEducation = education.map(item => 
                            item.id === edu.id ? {...item, degree: e.target.value} : item
                          );
                          setEducation(newEducation);
                        }}
                        className="font-medium w-full mb-1 border rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const newEducation = education.map(item => 
                            item.id === edu.id ? {...item, institution: e.target.value} : item
                          );
                          setEducation(newEducation);
                        }}
                        className="text-gray-600 w-full mb-1 border rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => {
                          const newEducation = education.map(item => 
                            item.id === edu.id ? {...item, year: e.target.value} : item
                          );
                          setEducation(newEducation);
                        }}
                        className="text-gray-500 w-full border rounded px-2 py-1"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-500">{edu.year}</p>
                    </>
                  )}
                </div>
              ))}
              {isEditing && (
                <button 
                  onClick={() => setEducation([...education, { id: Date.now(), degree: '', institution: '', year: '' }])}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  + Add Education
                </button>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="border-l-2 border-blue-500 pl-4 py-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => {
                          const newExperience = experience.map(item => 
                            item.id === exp.id ? {...item, position: e.target.value} : item
                          );
                          setExperience(newExperience);
                        }}
                        className="font-medium w-full mb-1 border rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const newExperience = experience.map(item => 
                            item.id === exp.id ? {...item, company: e.target.value} : item
                          );
                          setExperience(newExperience);
                        }}
                        className="text-gray-600 w-full mb-1 border rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => {
                          const newExperience = experience.map(item => 
                            item.id === exp.id ? {...item, duration: e.target.value} : item
                          );
                          setExperience(newExperience);
                        }}
                        className="text-gray-500 w-full border rounded px-2 py-1"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-gray-500">{exp.duration}</p>
                    </>
                  )}
                </div>
              ))}
              {isEditing && (
                <button 
                  onClick={() => setExperience([...experience, { id: Date.now(), position: '', company: '', duration: '' }])}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  + Add Experience
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;