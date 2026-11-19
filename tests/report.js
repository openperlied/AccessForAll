import { mkdirSync, writeFileSync } from 'node:fs';

export default class AuditReport {
  rows = [];

  onTestEnd(test, result) {
    const scans = result.attachments.filter(a => a.name === 'audit')
      .map(a => JSON.parse(a.body.toString('utf8')));
    this.rows.push({
      viewport: test.parent.project().name, journey: test.title, status: result.status, scans,
      error: result.error?.message?.replace(/\u001b\[[0-9;]*m/g, '')
    });
  }

  onEnd(result) {
    const rows = this.rows.sort((a, b) => (a.viewport + a.journey).localeCompare(b.viewport + b.journey));
    const report = ['# Accessibility audit', '', 'Run status: ' + result.status, '',
      '| Viewport | Journey | Test | State | Observed axe findings |',
      '| --- | --- | --- | --- | --- |'];
    for (const row of rows) {
      for (const scan of row.scans.length ? row.scans : [{ state: 'No scan completed', findings: [] }]) {
        const findings = scan.findings.map(f => f.rule + ' (' + f.selector + ')').join(', ');
        report.push('| ' + [row.viewport, row.journey, row.status, scan.state, findings || (row.scans.length ? '0' : '—')].join(' | ') + ' |');
      }
    }
    mkdirSync('reports', { recursive: true });
    writeFileSync('reports/audit.json', JSON.stringify({ status: result.status, journeys: rows }, null, 2));
    writeFileSync('reports/audit.md', report.join('\n') + '\n');
  }
}
