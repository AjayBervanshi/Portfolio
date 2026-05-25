import { describe, it, expect } from 'vitest';
import { executeSQLQuery, SCHEMA_INFO } from '../sqlEngine';

describe('T-SQL Query Parser Engine', () => {
  
  it('should respond to HELP command with schema descriptions', () => {
    const result = executeSQLQuery('HELP');
    expect(result.error).toBeNull();
    expect(result.columns).toEqual(['table_name', 'description']);
    expect(result.rows).toEqual(SCHEMA_INFO);
  });

  it('should retrieve all rows for SELECT * queries', () => {
    const result = executeSQLQuery('SELECT * FROM AboutMe');
    expect(result.error).toBeNull();
    expect(result.rows.length).toBe(1);
    expect(result.columns).toContain('name');
    expect(result.columns).toContain('title');
    expect(result.rows[0].name).toBe('Ajay Bervanshi');
  });

  it('should support projecting specific columns', () => {
    const result = executeSQLQuery('SELECT name, category, level FROM Skills');
    expect(result.error).toBeNull();
    expect(result.columns).toEqual(['name', 'category', 'level']);
    expect(result.rows[0]).toHaveProperty('name');
    expect(result.rows[0]).not.toHaveProperty('id');
  });

  it('should filter rows based on WHERE clause equalities', () => {
    const result = executeSQLQuery("SELECT * FROM Skills WHERE level = 'Expert'");
    expect(result.error).toBeNull();
    expect(result.rows.length).toBeGreaterThan(0);
    result.rows.forEach(row => {
      expect(row.level).toBe('Expert');
    });
  });

  it('should filter rows using case-insensitive LIKE matches', () => {
    const result = executeSQLQuery("SELECT * FROM Skills WHERE name LIKE '%Administration%'");
    expect(result.error).toBeNull();
    expect(result.rows.length).toBeGreaterThan(0);
    result.rows.forEach(row => {
      expect(row.name).toContain('Administration');
    });
  });

  it('should sort rows using ORDER BY', () => {
    const result = executeSQLQuery('SELECT * FROM Skills ORDER BY id DESC');
    expect(result.error).toBeNull();
    expect(result.rows.length).toBeGreaterThan(1);
    
    // Confirm the IDs decrease
    for (let i = 0; i < result.rows.length - 1; i++) {
      expect(result.rows[i].id).toBeGreaterThan(result.rows[i + 1].id);
    }
  });

  it('should reject invalid table names gracefully', () => {
    const result = executeSQLQuery('SELECT * FROM NonExistentTable');
    expect(result.error).not.toBeNull();
    expect(result.error).toContain('Invalid Table Name');
    expect(result.rows.length).toBe(0);
  });

  it('should handle syntax errors cleanly', () => {
    const result = executeSQLQuery('INSERT INTO Skills VALUES (99, "Hacking")');
    expect(result.error).not.toBeNull();
    expect(result.error).toContain('Syntax Error');
    expect(result.rows.length).toBe(0);
  });
});
