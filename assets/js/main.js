document.addEventListener('DOMContentLoaded', () => {
    fetch('worksheets.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('worksheets-container');
        
        data.grades.forEach(grade => {
          const gradeSection = document.createElement('div');
          gradeSection.className = 'grade-section';
          
          const gradeHeader = document.createElement('div');
          gradeHeader.className = 'grade-header';
          
          const toggleButton = document.createElement('button');
          toggleButton.className = 'toggle-button';
          toggleButton.setAttribute('aria-expanded', 'false');
          
          const gradeTitle = document.createElement('h2');
          gradeTitle.textContent = grade.name;
          
          toggleButton.appendChild(gradeTitle);
          gradeHeader.appendChild(toggleButton);
          gradeSection.appendChild(gradeHeader);
          
          const contentWrapper = document.createElement('div');
          contentWrapper.className = 'grade-content collapsed';
          
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
              link.href = `worksheets/${worksheet.path}`;
              link.textContent = `${worksheet.id} - ${worksheet.title}`;
              item.appendChild(link);
              worksheetList.appendChild(item);
            });
            
            weekSection.appendChild(worksheetList);
            contentWrapper.appendChild(weekSection);
          });
          
          gradeSection.appendChild(contentWrapper);
          container.appendChild(gradeSection);
          
          // Toggle functionality
          toggleButton.addEventListener('click', () => {
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            toggleButton.setAttribute('aria-expanded', !isExpanded);
            contentWrapper.classList.toggle('collapsed');
          });
        });
      })
      .catch(error => console.error('Error loading worksheets:', error));
});