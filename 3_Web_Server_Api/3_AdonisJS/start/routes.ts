import Route from '@ioc:Adonis/Core/Route';
import HealthCheck from '@ioc:Adonis/Core/HealthCheck';

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
});

Route.group(() => {

  Route.post('/login', 'AuthController.login');

  Route.group(() => {
    Route.post('/logout', 'AuthController.logout');
    Route.post('/users', 'AuthController.logout');
    Route.get('/users', 'AuthController.logout');
    Route.patch('/users/:id', 'AuthController.logout');
    Route.delete('/users/:id', 'AuthController.logout');
  }).middleware('auth');

})
  .prefix('/api');


