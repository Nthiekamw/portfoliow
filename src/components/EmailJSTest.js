import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import './EmailJSTest.css';

const EmailJSTest = () => {
  const [testStatus, setTestStatus] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const testEmailJS = async () => {
    setIsTesting(true);
    setTestStatus(null);

    try {
             // Test simple avec EmailJS
       const result = await emailjs.send(
         'service_av4lx2i',
         'template_z3ca2dx',
         {
           to_email: 'williamnthiekam392@gmail.com',
           from_name: 'Test Portfolio',
           from_email: 'test@portfolio.com',
           from_phone: 'Test',
           subject: 'Test EmailJS - Portfolio',
           message: 'Ceci est un test de configuration EmailJS pour votre portfolio.'
         }
       );

      console.log('Test EmailJS réussi:', result);
      setTestStatus('success');
    } catch (error) {
      console.error('Erreur test EmailJS:', error);
      setTestStatus('error');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="emailjs-test">
      <div className="test-header">
        <Mail size={20} />
        <h3>Test EmailJS</h3>
      </div>
      
             <div className="test-info">
         <p><strong>Service ID:</strong> service_av4lx2i</p>
         <p><strong>Public Key:</strong> WT_iGPC0q0WQjeElT</p>
         <p><strong>Template:</strong> template_z3ca2dx</p>
       </div>

      <button 
        onClick={testEmailJS}
        disabled={isTesting}
        className="test-btn"
      >
        {isTesting ? 'Test en cours...' : 'Tester EmailJS'}
      </button>

      {testStatus === 'success' && (
        <div className="test-result success">
          <CheckCircle size={16} />
          <span>Test réussi ! Email envoyé avec succès.</span>
        </div>
      )}

      {testStatus === 'error' && (
        <div className="test-result error">
          <AlertCircle size={16} />
          <span>Test échoué. Vérifiez la configuration.</span>
        </div>
      )}

      <div className="test-instructions">
        <h4>Instructions :</h4>
        <ol>
          <li>Créez le template "template_contact" dans EmailJS</li>
          <li>Vérifiez que le service est actif</li>
          <li>Cliquez sur "Tester EmailJS"</li>
          <li>Vérifiez votre Gmail pour recevoir le test</li>
        </ol>
      </div>
    </div>
  );
};

export default EmailJSTest;
