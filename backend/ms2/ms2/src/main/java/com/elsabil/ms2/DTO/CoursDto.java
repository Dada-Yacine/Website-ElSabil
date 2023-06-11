package com.elsabil.ms2.DTO;


import lombok.*;

@Data @AllArgsConstructor @NoArgsConstructor @Getter @Setter
public class CoursDto {

    private String coursNom;

    private Integer coursCoef;

    private Long enseignantId;


    private String enseigantNom;


    private String anneeNom;

}
