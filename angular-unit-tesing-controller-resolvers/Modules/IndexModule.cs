namespace angular_unit_tesing_controller_resolvers.Modules
{
    using Nancy;

    public class IndexModule : NancyModule
    {
        public IndexModule()
        {
            Get["/"] = _ => View["index"];
            Get["/Data"] = _ => Response.AsJson(new { Value = "Test" });
        }
    }
}