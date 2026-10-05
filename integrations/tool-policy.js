const permissions = {
  search_knowledge: { risk: 'low', requiresConfirmation: false },
  create_ticket: { risk: 'medium', requiresConfirmation: true },
  export_customer_data: { risk: 'critical', requiresConfirmation: true, allowed: false },
  delete_record: { risk: 'critical', requiresConfirmation: true, allowed: false }
};

export function authorizeToolCall(name, confirmed = false) {
  const policy = permissions[name];
  if (!policy) return { allowed: false, reason: 'unknown tool' };
  if (policy.allowed === false) return { allowed: false, reason: 'tool is prohibited by data policy', risk: policy.risk };
  if (policy.requiresConfirmation && !confirmed) return { allowed: false, requiresConfirmation: true, reason: 'explicit user confirmation required', risk: policy.risk };
  return { allowed: true, risk: policy.risk };
}
