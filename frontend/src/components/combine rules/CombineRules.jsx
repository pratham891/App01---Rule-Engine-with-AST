import React, { useState } from 'react';

const CombineRules = () => {
  const [ruleString1, setRuleString1] = useState('');
  const [ruleString2, setRuleString2] = useState('');
  const [combinedRule, setCombinedRule] = useState(null);

  const handleCombineRules = () => {
    // Placeholder for rule combination logic
    setCombinedRule(`${ruleString1} + ${ruleString2}`);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd' }}>
      <div>
        <label>
          Rule String 1:
          <input
            type="text"
            value={ruleString1}
            onChange={(e) => setRuleString1(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Rule String 2:
          <input
            type="text"
            value={ruleString2}
            onChange={(e) => setRuleString2(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCombineRules}>Combine</button>
      <div>
        {combinedRule && (
          <div>
            <h3>Combined Rule</h3>
            {/* Placeholder for combined rule display */}
            <pre>{combinedRule}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombineRules;
