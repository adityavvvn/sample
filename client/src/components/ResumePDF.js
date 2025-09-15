import React, { forwardRef } from 'react';
import EnhancedSkillGraph from './EnhancedSkillGraph';
import ProjectTimeline from './ProjectTimeline';

const ResumePDF = forwardRef(({ userData, skills, projects }, ref) => {
  // Calculate current skill levels
  const getCurrentSkillLevel = (skill) => {
    if (!skill.proficiency || skill.proficiency.length === 0) return 'N/A';
    const latest = skill.proficiency[skill.proficiency.length - 1];
    return latest.level;
  };

  // Get top skills (highest proficiency)
  const getTopSkills = () => {
    return skills
      .filter(skill => skill.proficiency && skill.proficiency.length > 0)
      .sort((a, b) => {
        const aLevel = getCurrentSkillLevel(a);
        const bLevel = getCurrentSkillLevel(b);
        return bLevel - aLevel;
      })
      .slice(0, 5);
  };

  // Get all certificates from skills
  const getAllCertificates = () => {
    const allCerts = [];
    skills.forEach(skill => {
      if (skill.certificates && skill.certificates.length > 0) {
        skill.certificates.forEach(cert => {
          allCerts.push({
            ...cert,
            skillName: skill.skill
          });
        });
      }
    });
    return allCerts.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div ref={ref} className="bg-white p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 border-b-2 border-gray-200 pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {userData?.name || 'Your Name'}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-2">
          {userData?.title || 'Software Developer'}
        </p>
        <div className="text-xs sm:text-sm text-gray-500 space-x-2 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-0">
          <span className="break-all">{userData?.email || 'email@example.com'}</span>
          <span className="hidden sm:inline">•</span>
          <span>{userData?.phone || '+1 (555) 123-4567'}</span>
          <span className="hidden sm:inline">•</span>
          <span>{userData?.location || 'Your Location'}</span>
        </div>
      </div>

      {/* Skills Summary */}
      {skills.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Skills Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {getTopSkills().map((skill, index) => (
              <div key={skill._id || index} className="bg-gradient-to-br from-gray-50 to-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{skill.skill}</span>
                  <span className="text-xs sm:text-sm text-blue-600 font-semibold ml-2">
                    L{getCurrentSkillLevel(skill)}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(getCurrentSkillLevel(skill) / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  {skill.certificates && skill.certificates.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <span>📜</span>
                      <span>{skill.certificates.length}</span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    {skill.proficiency.length}pt{skill.proficiency.length > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Progression Graph */}
      {skills.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Skills Progression</h2>
          <div className="border border-gray-200 rounded-lg p-2 sm:p-4 bg-gradient-to-br from-gray-50 to-white w-full overflow-x-auto">
            <div className="min-w-[280px] sm:min-w-[400px] lg:min-w-[600px]">
              <EnhancedSkillGraph data={skills} width={600} height={250} isResume={true} />
            </div>
          </div>
        </div>
      )}

      {/* Certificates & Credentials */}
      {getAllCertificates().length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Certificates & Credentials</h2>
          <div className="space-y-3 sm:space-y-4">
            {getAllCertificates().map((cert, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">{cert.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{cert.issuer}</p>
                    <p className="text-xs text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-full inline-block mt-1">
                      {cert.skillName}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      Issued: {formatDate(cert.issueDate)}
                    </p>
                    {cert.expiryDate && (
                      <p className="text-xs sm:text-sm text-gray-500">
                        Expires: {formatDate(cert.expiryDate)}
                      </p>
                    )}
                  </div>
                </div>
                {cert.credentialId && (
                  <p className="text-xs text-gray-500 mb-1 font-mono bg-gray-100 px-2 py-1 rounded break-all">
                    ID: {cert.credentialId}
                  </p>
                )}
                {cert.description && (
                  <p className="text-sm text-gray-700 mt-2 italic break-words">{cert.description}</p>
                )}
                {cert.credentialUrl && (
                  <p className="text-sm text-blue-600 mt-2">
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium break-all">
                      🔗 View Credential →
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Projects & Experience</h2>
          <div className="space-y-3 sm:space-y-4">
            {projects.map((project, index) => (
              <div key={project._id || index} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">{project.title}</h3>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </span>
                </div>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {project.description && (
                  <p className="text-gray-700 text-sm break-words">{project.description}</p>
                )}
                {project.link && (
                  <p className="text-sm text-blue-600 mt-2">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="break-all">
                      View Project →
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Timeline */}
      {projects.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Project Timeline</h2>
          <div className="border border-gray-200 rounded-lg p-2 sm:p-4 overflow-x-auto">
            <ProjectTimeline projects={projects} />
          </div>
        </div>
      )}

      {/* Empty State */}
      {skills.length === 0 && projects.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-500">
            Add skills and projects to your profile to generate a complete resume.
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
        <p>Generated by SkillSpot - Visual Resume & Career Mapper</p>
        <p className="break-words">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
        {userData?.name && <p className="break-words">Resume for: {userData.name}</p>}
      </div>
    </div>
  );
});

ResumePDF.displayName = 'ResumePDF';

export default ResumePDF; 