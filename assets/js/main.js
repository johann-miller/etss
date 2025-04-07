document.addEventListener('DOMContentLoaded', () => {
    fetch('worksheets.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('worksheets-container');
        
        data.grades.forEach(grade => {
          const gradeSection = document.createElement('div');
          gradeSection.className = 'grade-section';
          
          const gradeTitle = document.createElement('h2');
          gradeTitle.textContent = grade.name;
          gradeSection.appendChild(gradeTitle);
          
          grade.weeks.forEach(week => {
            const weekSection = document.createElement('div');
            weekSection.className = 'week-section';
            
            const weekTitle = document.createElement('h3');
            weekTitle.textContent = week.name;
            weekSection.appendChild(weekTitle);
            
            const worksheetList = document.createElement('ul');
            week.worksheets.forEach(worksheet => {
              const item = document.createElement('li');
              const link = document.createElement('a');
              link.href = worksheet.path;
              link.textContent = `${worksheet.id} - ${worksheet.title}`;
              item.appendChild(link);
              worksheetList.appendChild(item);
            });
            
            weekSection.appendChild(worksheetList);
            gradeSection.appendChild(weekSection);
          });
          
          container.appendChild(gradeSection);
        });
      })
      .catch(error => console.error('Error loading worksheets:', error));
  });