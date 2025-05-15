// JSON Structure Instructions:
// - Each grade has an "id" (grade number), "name", and "weeks" array
// - Each week has:
//   - "id": sequential week number (1-8)
//   - "name": descriptive name with format "Week X - topic"
//   - "worksheets": array of 6 worksheets
// - Each worksheet has:
//   - "id": position within the week (1-6), resets each week. For example, the third worksheet in the week has id:3
//   - "title": matches the PDF filename pattern "Spectrum Math G-C-L" where:
//     - G = grade number
//     - C = chapter number
//     - L = lesson number
//   - "path": follows pattern "Grade G/Week X/Spectrum Math G-C-L.pdf"
// 
// Important: Week names and topics should have only first word capitalized 
// unless containing proper nouns. Worksheet titles must exactly match the 
// generated PDF filenames from the extraction script.