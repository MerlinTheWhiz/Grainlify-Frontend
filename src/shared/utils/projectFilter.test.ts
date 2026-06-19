import { describe, it, expect } from 'vitest';
import { getRepoName, isValidProject } from './projectFilter';

describe('getRepoName', () => {
  it('extracts repo name from owner/repo format', () => {
    expect(getRepoName('owner/my-repo')).toBe('my-repo');
  });

  it('handles multi-level paths', () => {
    expect(getRepoName('org/team/repo')).toBe('team');
  });

  it('returns input when there is no slash', () => {
    expect(getRepoName('standalone')).toBe('standalone');
  });

  it('handles empty string', () => {
    expect(getRepoName('')).toBe('');
  });
});

describe('isValidProject', () => {
  it('accepts a valid project', () => {
    const project = { id: '123', github_full_name: 'owner/valid-repo' };
    expect(isValidProject(project)).toBe(true);
  });

  it('rejects .github repo', () => {
    const project = { id: '456', github_full_name: 'owner/.github' };
    expect(isValidProject(project)).toBe(false);
  });

  it('rejects null', () => {
    expect(isValidProject(null)).toBe(false);
  });

  it('rejects undefined', () => {
    expect(isValidProject(undefined)).toBe(false);
  });

  it('rejects project without id', () => {
    const project = { github_full_name: 'owner/repo' };
    expect(isValidProject(project)).toBe(false);
  });

  it('rejects project without github_full_name', () => {
    const project = { id: '123' };
    expect(isValidProject(project)).toBe(false);
  });

  it('rejects empty object', () => {
    expect(isValidProject({})).toBe(false);
  });
});
