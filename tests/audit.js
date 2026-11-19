import { expect } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export async function audit(page, info, state, expected) {
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  const findings = await page.evaluate(async () => {
    const { violations } = await window.axe.run();
    return violations.flatMap(rule => rule.nodes.map(node => ({
      rule: rule.id, impact: rule.impact, selector: node.target.join(' > ')
    })));
  });
  await info.attach('audit', {
    body: JSON.stringify({ state, findings }),
    contentType: 'application/json'
  });
  const targets = findings.map(({ rule, selector }) => [rule, selector]);
  expect(targets.sort()).toEqual([...expected].sort());
}
