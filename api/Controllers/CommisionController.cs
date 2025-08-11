using Microsoft.AspNetCore.Mvc;

namespace FCamara.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommisionController : ControllerBase
    {
        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        [HttpPost]
        public IActionResult Calculate(CommissionCalculationRequest calculationRequest)
        {
            // FCamera
            decimal fcLocal = calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount * 0.2m;
            decimal fcForeign = calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount * 0.35m;

            // Competitor
            decimal competitorLocal = calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount * 0.02m;
            decimal competitorForeign = calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount * 0.0755m;

            return Ok(new CommissionCalculationResponse() {
                FCamaraCommissionAmount = fcLocal + fcForeign,
                CompetitorCommissionAmount = competitorLocal + competitorForeign
            });
        }
    }

    public class CommissionCalculationRequest
    {
        public int LocalSalesCount { get; set; }
        public int ForeignSalesCount { get; set; }
        public decimal AverageSaleAmount { get; set; }
    }

    public class CommissionCalculationResponse
    {
        public decimal FCamaraCommissionAmount { get; set; }

        public decimal CompetitorCommissionAmount { get; set; }
    }
}
