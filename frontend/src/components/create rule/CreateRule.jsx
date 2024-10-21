import React, { useState } from 'react';

const CreateRule = () => {
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [ast, setAst] = useState(null);

  const handleCreateRule = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/rules/create_rule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ruleName, ruleString })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAst(data.ruleAST);
    } catch (error) {
      console.error('Error creating rule:', error);
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
          Rule Name:
          <input
            type="text"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Rule String:
          <input
            type="text"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCreateRule}>Create</button>
      <div>
        {ast && (
          <div>
            <h3>Created Rule AST</h3>
            {renderAST(ast)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRule;
