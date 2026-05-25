import { PERSONAL_INFO, SKILL_LEVELS, SKILL_START_DATES } from './constants';
import { calculateExperience, formatExperience } from './dateUtils';

export interface SQLQueryResult {
  columns: string[];
  rows: any[];
  error: string | null;
  executionTimeMs: number;
}

// Pre-populated relational data based on portfolio content
const TABLE_DATA: Record<string, any[]> = {
  aboutme: [
    {
      id: 1,
      name: PERSONAL_INFO.NAME,
      title: PERSONAL_INFO.TITLE,
      experience: `${calculateExperience()}+ Years`,
      location: PERSONAL_INFO.LOCATION,
      email: PERSONAL_INFO.EMAIL,
      phone: PERSONAL_INFO.PHONE,
      summary: 'MS SQL Server Database Administrator specializing in database management, performance optimization, high availability, and database security.',
      career_goal: 'To grow as a database administrator, driving innovation and automation to support organizational success while ensuring data integrity.',
      total_uptime: '99.9%',
    }
  ],
  skills: [
    // Database Management
    { id: 1, name: 'SQL Server Administration', category: 'Database Management', level: SKILL_LEVELS.EXPERT, experience: formatExperience(SKILL_START_DATES.CORE_SKILLS) },
    { id: 2, name: 'Database Performance Tuning', category: 'Database Management', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.MID_SKILLS) },
    { id: 3, name: 'Query Optimization', category: 'Database Management', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.MID_SKILLS) },
    { id: 4, name: 'Backup & Recovery Planning', category: 'Database Management', level: SKILL_LEVELS.EXPERT, experience: formatExperience(SKILL_START_DATES.CORE_SKILLS) },
    { id: 5, name: 'Database Health Monitoring', category: 'Database Management', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.MID_SKILLS) },
    // HA / DR
    { id: 6, name: 'Database Clustering', category: 'High Availability & DR', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.ADVANCED_SKILLS) },
    { id: 7, name: 'Database Mirroring', category: 'High Availability & DR', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.ADVANCED_SKILLS) },
    { id: 8, name: 'Disaster Recovery Planning', category: 'High Availability & DR', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.ADVANCED_SKILLS) },
    { id: 9, name: 'AlwaysOn Availability Groups', category: 'High Availability & DR', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.ADVANCED_SKILLS) },
    // Security
    { id: 10, name: 'User Access Control', category: 'Security & Compliance', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.SECURITY_SKILLS) },
    { id: 11, name: 'Data Encryption', category: 'Security & Compliance', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.SECURITY_SKILLS) },
    { id: 12, name: 'Security Policy Audit', category: 'Security & Compliance', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.SECURITY_SKILLS) },
    // Scripting
    { id: 13, name: 'T-SQL Scripting', category: 'Scripting & Automation', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.CORE_SKILLS) },
    { id: 14, name: 'PowerShell Automation', category: 'Scripting & Automation', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.EARLY_SKILLS) },
    { id: 15, name: 'Monitoring Scripts', category: 'Scripting & Automation', level: SKILL_LEVELS.ADVANCED, experience: formatExperience(SKILL_START_DATES.MID_SKILLS) },
    // Cloud
    { id: 16, name: 'AWS EC2 DB Hosting', category: 'Tools & Platforms', level: SKILL_LEVELS.ADVANCED, experience: '8 Months' },
    { id: 17, name: 'Azure SQL', category: 'Tools & Platforms', level: SKILL_LEVELS.INTERMEDIATE, experience: formatExperience(SKILL_START_DATES.CLOUD_SKILLS) }
  ],
  experience: [
    {
      id: 1,
      title: 'MS SQL Database Administrator',
      company: 'Pall Corporation',
      location: 'Pune, India',
      duration: 'Sep 2025 - Present',
      type: 'Full-time',
      key_achievement: 'Migrated and managed database infrastructures on AWS EC2 instances, implementing RDS, S3, and CloudWatch metrics.',
    },
    {
      id: 2,
      title: 'MS SQL Database Administrator',
      company: 'Wipro Limited',
      location: 'Mumbai, India',
      duration: 'Jul 2022 - Sep 2025',
      type: 'Full-time',
      key_achievement: 'Optimized T-SQL queries by 20%, automated 40% of maintenance tasks via PowerShell, and reduced database recovery times by 25%.',
    },
    {
      id: 3,
      title: 'Front End Web Developer Intern',
      company: 'Sankalpsoft Solution',
      location: 'Remote, India',
      duration: 'Sep 2021 - Oct 2021',
      type: 'Internship',
      key_achievement: 'Designed interactive web features for cafés and digital registration databases.',
    }
  ],
  education: [
    {
      id: 1,
      degree: 'Bachelor of Computer Application (BCA)',
      institution: 'G.H. Raisoni Institute Of IT',
      location: 'Nagpur, India',
      duration: 'Completed May 2022',
      grade: 'GPA: 8.2/10',
      specialization: 'Computer Applications & Coding',
    }
  ],
  contact: [
    {
      id: 1,
      email: PERSONAL_INFO.EMAIL,
      phone: PERSONAL_INFO.PHONE,
      linkedin: PERSONAL_INFO.LINKEDIN_URL,
      location: PERSONAL_INFO.LOCATION,
    }
  ]
};

// Help descriptions for DB system schema
export const SCHEMA_INFO = [
  { table_name: 'AboutMe', description: 'Ajay\'s summary, career goal, location, contact, and total experience.' },
  { table_name: 'Skills', description: 'Detailed database admin, AlwaysOn, scripting, security, and cloud skills.' },
  { table_name: 'Experience', description: 'Ajay\'s employment history, companies, timelines, and key achievements.' },
  { table_name: 'Education', description: 'Academic degree, institution details, location, and specialization grade.' },
  { table_name: 'Contact', description: 'Direct links and channels to connect with Ajay Bervanshi.' }
];

export const executeSQLQuery = (query: string): SQLQueryResult => {
  const startTime = performance.now();
  const result: SQLQueryResult = {
    columns: [],
    rows: [],
    error: null,
    executionTimeMs: 0
  };

  try {
    const trimmed = query.trim().replace(/;$/, '');
    if (!trimmed) {
      result.error = 'Query cannot be empty.';
      result.executionTimeMs = performance.now() - startTime;
      return result;
    }

    const upper = trimmed.toUpperCase();

    // Support HELP command
    if (upper === 'HELP' || upper === 'HELP SCHEMA') {
      result.columns = ['table_name', 'description'];
      result.rows = SCHEMA_INFO;
      result.executionTimeMs = performance.now() - startTime;
      return result;
    }

    // Direct system commands
    if (upper === 'SELECT * FROM SYS.TABLES' || upper === 'SELECT * FROM SYSTABLES') {
      result.columns = ['name', 'create_date', 'modify_date'];
      result.rows = Object.keys(TABLE_DATA).map(name => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        create_date: '2026-04-18 09:00:00',
        modify_date: '2026-05-24 12:00:00'
      }));
      result.executionTimeMs = performance.now() - startTime;
      return result;
    }

    // Basic SQL parser regex
    // Matches: SELECT (columns) FROM (table) [WHERE (column) = 'value' | LIKE '%value%'] [ORDER BY (column) ASC|DESC]
    const selectRegex = /^SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?$/i;
    const match = trimmed.match(selectRegex);

    if (!match) {
      result.error = "Syntax Error: Only basic SELECT queries are supported. Try:\n- SELECT * FROM Skills\n- SELECT * FROM Experience WHERE location = 'Pune, India'\n- SELECT name, level FROM Skills ORDER BY id DESC\n- Type 'HELP' to see all tables.";
      result.executionTimeMs = performance.now() - startTime;
      return result;
    }

    const selectColsRaw = match[1].trim();
    const tableNameRaw = match[2].trim().toLowerCase();
    const whereClauseRaw = match[3] ? match[3].trim() : null;
    const orderByRaw = match[4] ? match[4].trim() : null;

    // Normalise Table Name
    let actualTableName = tableNameRaw;
    if (tableNameRaw === 'aboutme' || tableNameRaw === 'about_me') {
      actualTableName = 'aboutme';
    }

    if (!TABLE_DATA[actualTableName]) {
      result.error = `Invalid Table Name: '${match[2]}'. Type 'HELP' or run 'SELECT * FROM sys.tables' to see list of valid tables.`;
      result.executionTimeMs = performance.now() - startTime;
      return result;
    }

    let sourceRows = [...TABLE_DATA[actualTableName]];

    // 1. Handle WHERE Clause
    if (whereClauseRaw) {
      // Handles: [column] = 'value' OR [column] LIKE '%value%' OR [column] = value
      const eqRegex = /^(\w+)\s*=\s*['"]?(.+?)['"]?$/i;
      const likeRegex = /^(\w+)\s+LIKE\s+['"]%?(.+?)%?['"]$/i;

      const eqMatch = whereClauseRaw.match(eqRegex);
      const likeMatch = whereClauseRaw.match(likeRegex);

      if (eqMatch) {
        const col = eqMatch[1].toLowerCase();
        const val = eqMatch[2].toLowerCase();

        sourceRows = sourceRows.filter(row => {
          const cell = row[Object.keys(row).find(k => k.toLowerCase() === col) || ''];
          return cell && cell.toString().toLowerCase() === val;
        });
      } else if (likeMatch) {
        const col = likeMatch[1].toLowerCase();
        const val = likeMatch[2].toLowerCase();

        sourceRows = sourceRows.filter(row => {
          const cell = row[Object.keys(row).find(k => k.toLowerCase() === col) || ''];
          return cell && cell.toString().toLowerCase().includes(val);
        });
      } else {
        result.error = "Unsupported WHERE clause. Only basic '=' or 'LIKE' operators are supported (e.g. WHERE category = 'HA/DR').";
        result.executionTimeMs = performance.now() - startTime;
        return result;
      }
    }

    // 2. Handle ORDER BY Clause
    if (orderByRaw) {
      const orderMatch = orderByRaw.match(/^(\w+)(?:\s+(ASC|DESC))?$/i);
      if (orderMatch) {
        const col = orderMatch[1].toLowerCase();
        const direction = orderMatch[2] ? orderMatch[2].toUpperCase() : 'ASC';

        sourceRows.sort((a, b) => {
          const keyA = Object.keys(a).find(k => k.toLowerCase() === col) || '';
          const keyB = Object.keys(b).find(k => k.toLowerCase() === col) || '';
          
          let valA = a[keyA];
          let valB = b[keyB];

          if (valA === undefined) return 1;
          if (valB === undefined) return -1;

          if (typeof valA === 'number' && typeof valB === 'number') {
            return direction === 'ASC' ? valA - valB : valB - valA;
          }

          valA = valA.toString().toLowerCase();
          valB = valB.toString().toLowerCase();

          if (valA < valB) return direction === 'ASC' ? -1 : 1;
          if (valA > valB) return direction === 'ASC' ? 1 : -1;
          return 0;
        });
      } else {
        result.error = 'Invalid ORDER BY clause syntax.';
        result.executionTimeMs = performance.now() - startTime;
        return result;
      }
    }

    // 3. Select columns
    if (sourceRows.length === 0) {
      // Empty set, return default columns of the table
      const sampleRow = TABLE_DATA[actualTableName][0];
      const allCols = Object.keys(sampleRow);
      
      if (selectColsRaw === '*') {
        result.columns = allCols;
      } else {
        const selectedCols = selectColsRaw.split(',').map(s => s.trim().toLowerCase());
        result.columns = allCols.filter(c => selectedCols.includes(c.toLowerCase()));
      }
      result.rows = [];
    } else {
      const sampleRow = sourceRows[0];
      const allCols = Object.keys(sampleRow);

      if (selectColsRaw === '*') {
        result.columns = allCols;
        result.rows = sourceRows;
      } else {
        const selectedCols = selectColsRaw.split(',').map(s => s.trim());
        const validSelectedCols = selectedCols.filter(col => 
          allCols.some(c => c.toLowerCase() === col.toLowerCase())
        );

        if (validSelectedCols.length === 0) {
          result.error = `Invalid columns selected. Columns must be from: ${allCols.join(', ')}`;
          result.executionTimeMs = performance.now() - startTime;
          return result;
        }

        result.columns = allCols.filter(c => 
          validSelectedCols.some(vc => vc.toLowerCase() === c.toLowerCase())
        );

        result.rows = sourceRows.map(row => {
          const projected: Record<string, any> = {};
          result.columns.forEach(col => {
            projected[col] = row[col];
          });
          return projected;
        });
      }
    }

  } catch (err: any) {
    result.error = `Execution Error: ${err.message || err}`;
  }

  result.executionTimeMs = parseFloat((performance.now() - startTime).toFixed(3));
  return result;
};
