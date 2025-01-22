import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';

export async function createAdminIfNotExists() {
    try {
        const existingAdmin = await User.findOne({ role: 'admin' });
        
        if (existingAdmin) {
            console.log('✅ Admin user already exists, skipping initialization.');
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin-password', salt);

        const adminUser = new User({
            username: "admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            phoneno: "9779977979",
            role: "admin"
        });

        await adminUser.save();
        
        console.log('\n✅ Admin user created successfully!');
        console.log('📧 Admin email:', 'admin@gmail.com');
        console.log('🔑 Admin password: admin-password\n');

    } catch (error) {
        if (error.code === 11000) {
            console.log('Admin user already exists (unique constraint violation).');
        } else {
            console.error('❌ Error creating admin user:', error.message);
        }
    }
}
