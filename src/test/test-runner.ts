import { execSync } from 'child_process';

class TestRunner {
  async runAllTests(): Promise<void> {
    console.log('🧪 APL PCD API Test Suite');
    console.log('==========================');

    const startTime = Date.now();

    try {
      console.log('🔬 Running Unit Tests...');
      execSync('npm run test:unit', { stdio: 'inherit' });
      
      console.log('🔗 Running Integration Tests...');
      execSync('npm run test:integration', { stdio: 'inherit' });
      
      const executionTime = Date.now() - startTime;
      console.log(`\n✅ All tests completed in ${executionTime}ms`);
      
    } catch (error) {
      console.error('❌ Test execution failed');
      process.exit(1);
    }
  }
}

if (require.main === module) {
  new TestRunner().runAllTests();
}

export { TestRunner };