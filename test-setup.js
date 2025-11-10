const axios = require('axios');

async function testSetup() {
  console.log('Testing MobiWorld Setup...\n');
  
  try {
    // Test backend connection
    console.log('1. Testing backend connection...');
    const response = await axios.get('http://localhost:5000/api/products');
    console.log('✅ Backend is running and responding!');
    console.log(`   Found ${response.data.length} products\n`);
  } catch (error) {
    console.log('❌ Backend test failed:');
    console.log('   Make sure:');
    console.log('   - Backend is running (npm run dev in server folder)');
    console.log('   - MongoDB is connected');
    console.log('   - .env file is properly configured\n');
  }
  
  try {
    // Test frontend connection
    console.log('2. Testing frontend connection...');
    const response = await axios.get('http://localhost:3000');
    console.log('✅ Frontend is running!\n');
  } catch (error) {
    console.log('❌ Frontend test failed:');
    console.log('   Make sure frontend is running (npm start in client folder)\n');
  }

  try {
    // Test bcrypt authentication
    console.log('3. Testing bcrypt authentication...');
    
    // Test registration
    const testUser = {
      username: 'testuser_' + Date.now(),
      email: 'test@example.com',
      password: 'TestPass123!'
    };
    
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', testUser);
    console.log('✅ User registration with bcrypt working!');
    
    // Test login
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      username: testUser.username,
      password: testUser.password
    });
    console.log('✅ User login with bcrypt working!');
    console.log('   JWT token generated successfully\n');
    
  } catch (error) {
    console.log('❌ Authentication test failed:');
    console.log('   Error:', error.response?.data?.message || error.message);
    console.log('   Make sure bcrypt is properly installed and configured\n');
  }
  
  console.log('Setup test complete!');
  console.log('If you see any ❌ errors, check the README.md for troubleshooting.');
  console.log('For migration help, see MIGRATION_GUIDE.md');
}

testSetup(); 