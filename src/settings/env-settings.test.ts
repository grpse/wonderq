import { EnvSettings } from './env-settings'

describe('Settings', () => {
    describe('EnvSettings', () => {
        afterEach(() => {
            process.env['TEST_ENV'] = ''
        })

        it('should return defined env setting', () => {
            // 1. arrange            
            process.env['TEST_ENV'] = 'TEST'
            const settings = new EnvSettings()

            // 2. act
            const settingData = settings.getString('TEST_ENV')

            // 3. assert
            expect(settingData).toEqual(process.env['TEST_ENV'])
        })

        it('should return empty env setting', () => {
            // 1. arrange            
            const settings = new EnvSettings()

            // 2. act
            const settingData = settings.getString('TEST_ENV')

            // 3. assert
            expect(settingData).toBeNull()
        })

        it('should return defined env number', () => {
            // 1. arrange            
            process.env['TEST_ENV'] = '123'
            const settings = new EnvSettings()

            // 2. act
            const settingData = settings.getNumber('TEST_ENV')

            // 3. assert
            expect(settingData).toEqual(Number(process.env['TEST_ENV']))
        })

        it('should return empty env number', () => {
            // 1. arrange
            const settings = new EnvSettings()

            // 2. act
            const settingData = settings.getNumber('TEST_ENV')

            // 3. assert
            expect(settingData).toEqual(0)
        })
    })
})