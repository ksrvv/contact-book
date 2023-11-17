using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Test_Task.Models.DBEntities
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [DisplayName("Name")]
        public string Name { get; set; }
        [Required]
        [DisplayName("Mobile phone")]
        public string MobilePhone { get; set; }
        [Required]
        [DisplayName("Job title")]

        public string JobTitle { get; set; }
        [Required]
        [DisplayName("Birth date")]

        public DateTime BirthDate { get; set; }
    }
}
