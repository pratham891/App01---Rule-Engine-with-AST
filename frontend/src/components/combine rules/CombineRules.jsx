import React, { useState } from 'react';

const CombineRules = () => {
  const [ruleString1, setRuleString1] = useState('');
  const [ruleString2, setRuleString2] = useState('');
  const [operator, setOperator] = useState('AND');
  const [combinedRule, setCombinedRule] = useState(null);

  const handleCombineRules = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/rules/combine_rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rules: [ruleString1, ruleString2], op: operator }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCombinedRule(data.ruleAST);
    } catch (error) {
      console.error('Error combining rules:', error);
    }
  };

  const renderAST = (node, prefix = '', isLeft = true) => {
    if (!node) return null;

    return (
      <div>
        <div>
          {prefix + (isLeft ? "├── " : "└── ") + (node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`)}
        </div>
        <div>
          {node.left && renderAST(node.left, prefix + (isLeft ? '│   ' : '    '), true)}
          {node.right && renderAST(node.right, prefix + (isLeft ? '│   ' : '    '), false)}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd' }}>
      <div>
        <label>
          Rule Name 1:
          <input
            type="text"
            value={ruleString1}
            onChange={(e) => setRuleString1(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Rule Name 2:
          <input
            type="text"
            value={ruleString2}
            onChange={(e) => setRuleString2(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Operator:
          <select value={operator} onChange={(e) => setOperator(e.target.value)}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </label>
      </div>
      <button onClick={handleCombineRules}>Combine</button>
      <div>
        {combinedRule && (
          <div>
            <h3>Combined Rule AST</h3>
            {renderAST(combinedRule)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CombineRules;
