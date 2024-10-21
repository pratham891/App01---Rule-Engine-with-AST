import React, { useState } from 'react';

const EvaluateRule = () => {
  const [ruleName, setRuleName] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleEvaluateRule = async () => {
    try {
      const data = JSON.parse(jsonData);
      const response = await fetch('http://localhost:3000/api/rules/evaluate_rule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ast: ruleName, data }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setEvaluationResult(result.result);
    } catch (error) {
      console.error('Error:', error.message);
      setEvaluationResult('Invalid JSON or Network Error');
    }
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
          JSON Data:
          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder='{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'
          />
        </label>
      </div>
      <button onClick={handleEvaluateRule}>Evaluate</button>
      <div>
        {evaluationResult !== null && (
          <div>
            <h3>Evaluation Result</h3>
            <pre>{String(evaluationResult)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluateRule;
