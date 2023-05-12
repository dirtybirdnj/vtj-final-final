import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const AboutContainer = styled.div`
  h3 {
    margin-bottom: 10px;
  }

  button {
    align-self: stretch;
  }

`;

function About({
  pageData,
  currentRoute
}) {

  return (
    <AboutContainer>
      <Image src={'https://res.cloudinary.com/vtapico/image/upload/v1683861777/verticaltubejig.com/mat_pics/Screen_Shot_2023-05-11_at_12.18.54_AM_xj18gm.jpg'}
        width={5120}
        height={2880}
        alt="image shows up"
        layout="responsive"
        />
      <p>Verticaltubejig.com was created by Mat Gilbert at the end of 2022 after two years of refinement and practice hunting the majestic Lake Trout in Lake Champlain.</p>

      <Image src={'https://res.cloudinary.com/vtapico/image/upload/v1672421023/verticaltubejig.com/fish_pics/lake_trout/PXL_20220220_144530216_ksnyqg.jpg'}
        width={4032}
        height={3024}
        alt="image shows up"
        layout="responsive"
        />

      <p>At first fishing for lakers was done with big 1-2oz jigheads and very large swimbaits. Mat always had trouble getting his lure down fast enough, so he started experimenting with tube jig hooks. Nothing was quite heavy / big enough.</p>

       <p>On a trip to Rhode Island Mat found some very large saltwater spoons and the idea to make bigger laker baits was born.</p>


      <Image src={'https://res.cloudinary.com/vtapico/image/upload/v1672160723/verticaltubejig.com/vtj_research/20220304_122912_jql4zd.jpg'}
        width={4032}
        height={1816}
        alt="image shows up"
        layout="responsive"
        />

      <p>Eventually Mat got the idea to use Eagle Claw trolling weights inside tubes. Instead of rigging them horizontally, this new vertical rigging offers a few benefits: </p>

      <Image src={'https://res.cloudinary.com/vtapico/image/upload/v1672160736/verticaltubejig.com/vtj_research/20220304_123030_xjrtjg.jpg'}
        width={1816}
        height={4032}
        alt="image shows up"
        layout="responsive"
        />



      <ol>
        <li>The hook is hidden within the tassles of the tube tail</li>
        <li>The swivels on the top and bottom of the trolling weight prevent the fish from getting leverage and spitting the hook</li>
        <li>Can be fished with or without a plastic tube!</li>
        <li>Fast rising lakers attack the bait from bottom, this hook orientation is supirior to jigheads and increases your hookup ratio!</li>
        </ol>

      <p>The proof is in the pudding, fish attack these fast charging baits and leave plastics in tattered pieces!</p>


      <Image src={'https://res.cloudinary.com/vtapico/image/upload/v1672160759/verticaltubejig.com/vtj_research/20220726_195452_01_mghoxa.jpg'}
        width={4032}
        height={3024}
        alt="image shows up"
        layout="responsive"
        />

        <p>This new rigging strategy has proved deadly! Now Mat has been experimenting with &quot;tubeless&quot; tubes that can be fished with or without a plastic tube sleeve on them.</p>


        <Image src={'https://res.cloudinary.com/vtapico/image/upload/v1683918704/verticaltubejig.com/product-photos/inventory-5.12.23.2_xohfem.jpg'}
        width={3700}
        height={1816}
        alt="image shows up"
        layout="responsive"
        />

      <p>In addition to the pictures and articles on this website, you can also see these lures in action on the YouTube channel VT2U where Mat and friends go out on adventures to chase fish in Vermont. As they say, don&apos;t believe us just watch!</p>


    </AboutContainer>
  )
}

export default About;
