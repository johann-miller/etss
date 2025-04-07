document.addEventListener('DOMContentLoaded', () => {
    // Add loading indicator
    const container = document.getElementById('worksheets-container');
    container.innerHTML = '<div class="loading">Loading worksheets...</div>';
    
    fetch('worksheets.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Clear loading indicator
        container.innerHTML = '';
        
        data.grades.forEach(grade => {
          const gradeSection = document.createElement('div');
          gradeSection.className = 'grade-section';
          
          const gradeTitle = document.createElement('h2');
          gradeTitle.textContent = grade.name;
          gradeSection.appendChild(gradeTitle);
          
          // Check if grade has any weeks
          if (grade.weeks && grade.weeks.length > 0) {
            grade.weeks.forEach(week => {
              const weekSection = document.createElement('div');
              weekSection.className = 'week-section';
              
              const weekTitle = document.createElement('h3');
              weekTitle.textContent = week.name;
              weekSection.appendChild(weekTitle);
              
              // Check if week has any worksheets
              if (week.worksheets && week.worksheets.length > 0) {
                const worksheetList = document.createElement('ul');
                week.worksheets.forEach(worksheet => {
                  const item = document.createElement('li');
                  const link = document.createElement('a');
                  link.href = `worksheets/${worksheet.path}`;
                  link.textContent = `${worksheet.id} - ${worksheet.title}`;
                  // Add download attribute
                  link.setAttribute('download', '');
                  
                  item.appendChild(link);
                  worksheetList.appendChild(item);
                });
                
                weekSection.appendChild(worksheetList);
              } else {
                const noWorksheets = document.createElement('p');
                noWorksheets.textContent = 'No worksheets available for this week.';
                weekSection.appendChild(noWorksheets);
              }
              
              gradeSection.appendChild(weekSection);
            });
          } else {
            const noWeeks = document.createElement('p');
            noWeeks.textContent = 'No content available for this grade.';
            gradeSection.appendChild(noWeeks);
          }
          
          container.appendChild(gradeSection);
        });
      })
      .catch(error => {
        console.error('Error loading worksheets:', error);
        container.innerHTML = `<div class="error">Error loading worksheets. Please try again later.</div>`;
      });
  });