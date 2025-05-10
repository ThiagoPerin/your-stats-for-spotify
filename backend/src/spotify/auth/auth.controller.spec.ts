import { AuthController } from './auth.controller';

describe('AuthController', () => {
    let controller: AuthController;
    const authServiceMock = {
        getLoginUrl: jest.fn().mockReturnValue('http://spotify/login'),
        getTokens: jest.fn().mockResolvedValue('session123'),
    };

    beforeEach(() => {
        controller = new AuthController(authServiceMock as any);
    });

    it('should redirect to login URL', () => {
        const res = { redirect: jest.fn() } as any;
        controller.login(res);
        expect(res.redirect).toHaveBeenCalledWith('http://spotify/login');
    });

    it('should handle callback and redirect with session ID', async () => {
        const res = { redirect: jest.fn() } as any;
        await controller.callback('code123', res);
        expect(res.redirect).toHaveBeenCalledWith('/success?session_id=session123');
    });
});
